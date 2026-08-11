import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = (stored || "").split("$");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(pw, salt, 32).toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
  } catch {
    return false;
  }
}

// DELETE /api/comments/[id]  { password }  → 비번 확인 후 soft delete
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "방명록이 설정되지 않았습니다." }, { status: 503 });
  }
  const { id } = await params;
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const password = body.password || "";

  const { data: row, error: readErr } = await supabase
    .from("comments")
    .select("id, password_hash")
    .eq("id", id)
    .eq("visible", true)
    .single();

  if (readErr || !row) {
    return NextResponse.json({ error: "메시지를 찾을 수 없습니다." }, { status: 404 });
  }
  if (!verifyPassword(password, row.password_hash)) {
    return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 403 });
  }

  const { error: updErr } = await supabase
    .from("comments")
    .update({ visible: false })
    .eq("id", id);

  if (updErr) {
    return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
