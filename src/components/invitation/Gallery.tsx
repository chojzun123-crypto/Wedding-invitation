"use client";

import { useCallback, useEffect, useState } from "react";
import { invitation } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";
import PhotoImg from "./PhotoImg";

export default function Gallery() {
  const images = invitation.gallery.images;
  const preview = invitation.gallery.preview ?? 9;
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const shown = expanded ? images : images.slice(0, preview);
  const hasMore = images.length > preview;

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  // 간단 스와이프
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchEnd = (endX: number) => {
    if (touchX === null) return;
    const dx = endX - touchX;
    if (dx > 50) prev();
    else if (dx < -50) next();
    setTouchX(null);
  };

  if (!images.length) return null;

  return (
    <Section label="GALLERY" title="우리의 순간">
      <Reveal className="mx-auto max-w-card">
        <div className="grid grid-cols-3 gap-1.5">
          {shown.map((src, i) => (
            <button
              key={src}
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`갤러리 사진 ${i + 1} 열기`}
            >
              <PhotoImg
                src={src}
                alt={`갤러리 사진 ${i + 1}`}
                index={i + 1}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="mt-5 text-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-6 py-2.5 text-sm text-point shadow-sm active:scale-95"
            >
              {expanded ? "접기" : "더보기"}
              <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>⌄</span>
            </button>
          </div>
        )}
      </Reveal>

      {/* 모달 */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/92"
          onClick={close}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={close}
              aria-label="닫기"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-point shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
          >
            <PhotoImg
              src={images[open]}
              alt={`갤러리 사진 ${open + 1}`}
              index={open + 1}
              className="max-h-[78vh] max-w-full rounded-lg object-contain"
            />
          </div>

          <div
            className="flex items-center justify-between p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              aria-label="이전"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-point shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="14 6 8 12 14 18" />
              </svg>
            </button>
            <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-point shadow-sm">
              {open + 1} / {images.length}
            </span>
            <button
              onClick={next}
              aria-label="다음"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-point shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="10 6 16 12 10 18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
