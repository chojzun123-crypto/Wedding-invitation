"use client";

import { useState } from "react";
import { invitation, type Account } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";
import { useToast } from "./Toast";

function AccountRow({ a }: { a: Account }) {
  const { show } = useToast();
  const copy = async () => {
    const text = a.number.replace(/[^0-9]/g, "");
    try {
      await navigator.clipboard.writeText(text);
      show("계좌번호가 복사되었습니다");
    } catch {
      show("복사 실패, 길게 눌러 복사해 주세요");
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-3.5 first:border-t-0">
      <div className="min-w-0">
        <p className="text-sm text-ink">
          {a.bank} <span className="text-sub">|</span> {a.holder}
        </p>
        <p className="truncate text-[13px] text-sub">{a.number}</p>
        <p className="text-[12px] text-accent">{a.relation}</p>
      </div>
      <button
        onClick={copy}
        className="shrink-0 rounded-lg border border-line bg-paper px-3 py-2 text-xs text-point active:scale-95"
      >
        복사
      </button>
    </div>
  );
}

function Group({ title, list }: { title: string; list: Account[] }) {
  const [open, setOpen] = useState(false);
  if (!list.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-[15px] text-ink">{title}</span>
        <span className={`text-sub transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          {list.map((a, i) => (
            <AccountRow key={i} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Accounts() {
  const groom = invitation.accounts.filter((a) => a.group === "groom");
  const bride = invitation.accounts.filter((a) => a.group === "bride");
  if (!groom.length && !bride.length) return null;

  return (
    <Section label="ACCOUNT" title="마음 전하실 곳">
      <Reveal className="mx-auto max-w-card space-y-3">
        <p className="mb-4 text-center text-sm leading-relaxed text-sub">
          참석이 어려우신 분들을 위해 기재하였습니다.
          <br />
          따뜻한 마음에 감사드립니다.
        </p>
        <Group title="신랑측 계좌번호" list={groom} />
        <Group title="신부측 계좌번호" list={bride} />
      </Reveal>
    </Section>
  );
}
