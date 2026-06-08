"use client";

import type { ReactNode } from "react";
import { invitation } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";
import { useToast } from "./Toast";

export default function MapSection() {
  const { wedding } = invitation;
  const { show } = useToast();
  const q = encodeURIComponent(wedding.placeName);
  const addr = encodeURIComponent(wedding.address);

  // 길찾기 딥링크 (웹 폴백 URL)
  const links = [
    {
      name: "카카오맵",
      href: `https://map.kakao.com/link/search/${q}`,
      color: "bg-[#FEE500] text-ink",
    },
    {
      name: "네이버지도",
      href: `https://map.naver.com/v5/search/${q}`,
      color: "bg-[#03C75A] text-white",
    },
    {
      name: "구글지도",
      href: `https://www.google.com/maps/search/?api=1&query=${q}`,
      color: "bg-white text-ink border border-line",
    },
  ];

  const copyAddr = async () => {
    try {
      await navigator.clipboard.writeText(wedding.address);
      show("주소가 복사되었습니다");
    } catch {
      show("복사 실패, 길게 눌러 복사해 주세요");
    }
  };

  const transport = wedding.transport ?? [];

  const transportIcon: Record<string, ReactNode> = {
    car: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
        <path d="M5 13h14v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
        <circle cx="7.5" cy="15.5" r="0.6" fill="currentColor" />
        <circle cx="16.5" cy="15.5" r="0.6" fill="currentColor" />
      </svg>
    ),
    subway: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="4" width="12" height="13" rx="3" />
        <path d="M6 11h12" />
        <circle cx="9" cy="14" r="0.6" fill="currentColor" />
        <circle cx="15" cy="14" r="0.6" fill="currentColor" />
        <path d="M8 20l1.5-3M16 20l-1.5-3" />
      </svg>
    ),
    bus: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="4" width="14" height="13" rx="2" />
        <path d="M5 11h14M9 4v7" />
        <circle cx="8" cy="14.5" r="0.6" fill="currentColor" />
        <circle cx="16" cy="14.5" r="0.6" fill="currentColor" />
        <path d="M7 20v-2M17 20v-2" />
      </svg>
    ),
  };

  return (
    <Section label="LOCATION" title="오시는 길" className="bg-paper">
      <Reveal className="mx-auto max-w-card">
        <div className="text-center">
          <p className="font-serif text-lg text-ink">
            {wedding.venue} <span className="text-sub">{wedding.hall}</span>
          </p>
          <button
            onClick={copyAddr}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-sub underline-offset-4 hover:underline"
          >
            {wedding.address}
            <span className="text-xs text-accent">복사</span>
          </button>
          <p className="mt-1 text-sm text-sub">
            <a href={`tel:${wedding.tel}`} className="hover:underline">
              ☎ {wedding.tel}
            </a>
          </p>
        </div>

        {/* 카카오 정적 지도 임베드 (좌표 기반) */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <iframe
            title="예식장 지도"
            className="h-56 w-full"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${wedding.lat},${wedding.lng}&z=16&output=embed`}
          />
        </div>

        {/* 길찾기 버튼 */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center rounded-xl py-3 text-sm font-medium shadow-sm transition active:scale-[0.98] ${l.color}`}
            >
              {l.name}
            </a>
          ))}
        </div>

        {/* 교통 안내 */}
        {transport.length > 0 && (
          <div className="mt-8 space-y-3">
            {transport.map((t) => (
              <div
                key={t.label}
                className="flex gap-3 rounded-2xl border border-line bg-ivory/50 px-4 py-3.5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-point">
                  {transportIcon[t.icon] ?? transportIcon.car}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{t.label}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-sub">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}
