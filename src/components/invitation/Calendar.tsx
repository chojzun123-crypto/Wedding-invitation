"use client";

import { useEffect, useMemo, useState } from "react";
import { invitation } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // SSR/첫 렌더 깜빡임 방지: 마운트 전엔 0으로 표시
  const diff = now === null ? 0 : Math.max(0, target - now);
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  const items = [
    { v: days, l: "DAYS" },
    { v: hours, l: "HOUR" },
    { v: mins, l: "MIN" },
    { v: secs, l: "SEC" },
  ];

  return (
    <div className="mt-7 flex items-stretch justify-center gap-2.5">
      {items.map((it, i) => (
        <div key={it.l} className="flex items-stretch gap-2.5">
          <div className="flex w-[58px] flex-col items-center rounded-xl bg-blush/70 py-3">
            <span className="font-serif text-xl font-bold text-point tabular-nums">
              {String(it.v).padStart(2, "0")}
            </span>
            <span className="mt-0.5 text-[10px] tracking-[0.15em] text-sub">
              {it.l}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="self-center font-serif text-lg text-line">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Calendar() {
  const { wedding } = invitation;

  const data = useMemo(() => {
    const w = new Date(wedding.datetime);
    const year = w.getFullYear();
    const month = w.getMonth(); // 0-based
    const weddingDay = w.getDate();

    const first = new Date(year, month, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    // D-day: 오늘 0시 기준 (예식 당일 = D-day)
    const now = new Date();
    const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const wDay0 = new Date(year, month, weddingDay);
    const diff = Math.round((wDay0.getTime() - today0.getTime()) / 86400000);

    let dday: string;
    if (diff > 0) dday = `D-${diff}`;
    else if (diff === 0) dday = "D-DAY";
    else dday = `D+${Math.abs(diff)}`;

    return {
      year,
      month: month + 1,
      weddingDay,
      cells,
      dday,
      weekday: w.getDay(),
      targetMs: w.getTime(),
    };
  }, [wedding.datetime]);

  return (
    <Section label="WEDDING DAY" title="예식 안내" className="bg-paper">
      <Reveal className="mx-auto max-w-card">
        <p className="text-center font-serif text-lg text-ink">
          {wedding.dateText}
        </p>
        <p className="mt-1 text-center text-sm text-sub">
          {wedding.timeText} · {wedding.venue} {wedding.hall}
        </p>

        {/* 캘린더 */}
        <div className="mt-8 rounded-2xl border border-line bg-ivory/60 p-5">
          <p className="mb-4 text-center font-serif text-base text-point">
            {data.year}. {String(data.month).padStart(2, "0")}
          </p>
          <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
            {WEEKDAYS.map((d, i) => (
              <div
                key={d}
                className={`pb-1 text-xs ${
                  i === 0 ? "text-rose-400" : i === 6 ? "text-point" : "text-sub"
                }`}
              >
                {d}
              </div>
            ))}
            {data.cells.map((d, i) => {
              const isWed = d === data.weddingDay;
              const col = i % 7;
              return (
                <div key={i} className="flex items-center justify-center">
                  {d === null ? (
                    <span />
                  ) : isWed ? (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-point font-semibold text-white shadow">
                      {d}
                    </span>
                  ) : (
                    <span
                      className={`flex h-9 w-9 items-center justify-center ${
                        col === 0
                          ? "text-rose-400/80"
                          : col === 6
                          ? "text-point/80"
                          : "text-ink/80"
                      }`}
                    >
                      {d}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 카운트다운 타이머 */}
        <Countdown target={data.targetMs} />

        {/* D-day */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          <span className="text-sub">
            {invitation.groom.name} <span className="text-point">♥</span>{" "}
            {invitation.bride.name}
          </span>
          <span className="rounded-full bg-point px-3 py-1 text-xs font-semibold text-white">
            {data.dday}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
