"use client";

import { useCallback, useEffect, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { useToast } from "./Toast";

type Msg = { id: string; name: string; message: string; created_at: string };
const PAGE = 5;

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

export default function Guestbook() {
  const { show } = useToast();
  const [items, setItems] = useState<Msg[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notConfigured, setNotConfigured] = useState(false);

  // 작성 폼
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 삭제
  const [delId, setDelId] = useState<string | null>(null);
  const [delPw, setDelPw] = useState("");

  const load = useCallback(async (offset: number, replace: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?offset=${offset}&limit=${PAGE}`, { cache: "no-store" });
      const data = await res.json();
      if (data.notConfigured) setNotConfigured(true);
      setTotal(data.total ?? 0);
      setItems((prev) => (replace ? data.items ?? [] : [...prev, ...(data.items ?? [])]));
    } catch {
      // 조용히 무시
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(0, true);
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        show(data.error || "저장에 실패했습니다.");
        return;
      }
      setItems((prev) => [data.item, ...prev]);
      setTotal((t) => t + 1);
      setName("");
      setMessage("");
      setPassword("");
      setOpen(false);
      show("축하 메시지가 등록되었습니다");
    } catch {
      show("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const doDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: delPw }),
      });
      const data = await res.json();
      if (!res.ok) {
        show(data.error || "삭제에 실패했습니다.");
        return;
      }
      setItems((prev) => prev.filter((m) => m.id !== id));
      setTotal((t) => Math.max(0, t - 1));
      setDelId(null);
      setDelPw("");
      show("메시지가 삭제되었습니다");
    } catch {
      show("네트워크 오류가 발생했습니다.");
    }
  };

  const hasMore = items.length < total;

  return (
    <Section label="GUESTBOOK" title="축하 메시지">
      <Reveal className="mx-auto max-w-card">
        {/* 작성 버튼 / 폼 */}
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="mb-6 w-full rounded-xl border border-line bg-paper py-3 text-sm font-medium text-point shadow-sm active:scale-[0.99]"
          >
            ✎ 축하 메시지 남기기
          </button>
        ) : (
          <form
            onSubmit={submit}
            className="mb-6 space-y-2.5 rounded-2xl border border-line bg-paper p-4 shadow-sm"
          >
            <div className="flex gap-2.5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                maxLength={50}
                className="w-1/2 rounded-lg border border-line bg-ivory/60 px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="비밀번호(수정·삭제용)"
                className="w-1/2 rounded-lg border border-line bg-ivory/60 px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="축하 메시지를 남겨주세요"
              rows={3}
              maxLength={500}
              className="w-full resize-none rounded-lg border border-line bg-ivory/60 px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-line bg-paper py-2.5 text-sm text-sub"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-point py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {submitting ? "등록 중…" : "등록하기"}
              </button>
            </div>
          </form>
        )}

        {/* 목록 */}
        {notConfigured ? (
          <p className="py-8 text-center text-sm text-sub">
            방명록 준비 중입니다. 잠시만 기다려 주세요.
          </p>
        ) : items.length === 0 && !loading ? (
          <p className="py-8 text-center text-sm text-sub">
            첫 번째 축하 메시지를 남겨주세요 💛
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((m) => (
              <li key={m.id} className="rounded-2xl border border-line bg-ivory/50 px-4 py-3.5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{m.name}</span>
                  <span className="text-[11px] text-sub/70">{fmtDate(m.created_at)}</span>
                </div>
                <p className="whitespace-pre-wrap break-words text-[14px] leading-relaxed text-ink/80">
                  {m.message}
                </p>

                {delId === m.id ? (
                  <div className="mt-2.5 flex gap-2">
                    <input
                      value={delPw}
                      onChange={(e) => setDelPw(e.target.value)}
                      type="password"
                      placeholder="비밀번호"
                      className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-xs outline-none focus:border-accent"
                    />
                    <button
                      onClick={() => doDelete(m.id)}
                      className="rounded-lg bg-point px-3 py-2 text-xs text-white"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        setDelId(null);
                        setDelPw("");
                      }}
                      className="rounded-lg border border-line px-3 py-2 text-xs text-sub"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setDelId(m.id);
                      setDelPw("");
                    }}
                    className="mt-1.5 text-[11px] text-sub/60 hover:text-sub"
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <div className="mt-5 text-center">
            <button
              onClick={() => load(items.length, false)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-6 py-2.5 text-sm text-point shadow-sm active:scale-95 disabled:opacity-60"
            >
              {loading ? "불러오는 중…" : "더보기"}
            </button>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
