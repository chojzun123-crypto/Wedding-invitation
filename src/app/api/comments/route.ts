import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 비밀번호 해시 (salt$hash)
function hashPassword(pw: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, 32).toString("hex");
  return `${salt}$${hash}`;
}

// GET /api/comments?offset=0&limit=5  → 최신순 목록
export async function GET(req: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ items: [], total: 0, notConfigured: true });
  }
  const { searchParams } = new URL(req.url);
  const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "5", 10)));

  const { data, error, count } = await supabase
    .from("comments")
    .select("id, name, message, created_at", { count: "exact" })
    .eq("visible", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }
  return NextResponse.json({ items: data ?? [], total: count ?? 0 });
}

// POST /api/comments  { name, message, password }
export async function POST(req: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "방명록이 아직 설정되지 않았습니다." }, { status: 503 });
  }
  let body: { name?: string; message?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const name = (body.name || "").trim();
  const message = (body.message || "").trim();
  const password = body.password || "";

  if (name.length < 1 || name.length > 50)
    return NextResponse.json({ error: "이름을 입력해 주세요. (1~50자)" }, { status: 400 });
  if (message.length < 1 || message.length > 500)
    return NextResponse.json({ error: "메시지를 입력해 주세요. (1~500자)" }, { status: 400 });
  if (password.length < 4)
    return NextResponse.json({ error: "비밀번호를 4자 이상 입력해 주세요." }, { status: 400 });

  const { data, error } = await supabase
    .from("comments")
    .insert({ name, message, password_hash: hashPassword(password) })
    .select("id, name, message, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
  return NextResponse.json({ item: data }, { status: 201 });
}
