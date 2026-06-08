"use client";

import { useEffect, useState } from "react";
import { invitation } from "@/lib/invitation/content";
import { useToast } from "./Toast";

declare global {
  interface Window {
    Kakao?: any;
  }
}

/** 우하단 공유 FAB + 맨 위로 버튼 (스크롤 시 노출) */
export default function FloatingButtons() {
  const [show, setShow] = useState(false);
  const { show: toast } = useToast();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const url = window.location.href;
    const Kakao = window.Kakao;
    if (Kakao && Kakao.isInitialized && Kakao.isInitialized()) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: invitation.meta.title,
          description: invitation.meta.description,
          imageUrl: invitation.meta.url.replace(/\/$/, "") + invitation.meta.ogImage,
          link: { mobileWebUrl: url, webUrl: url },
        },
      });
      return;
    }
    if (navigator.share) {
      navigator
        .share({
          title: invitation.meta.title,
          text: invitation.meta.description,
          url,
        })
        .catch(() => {});
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast("링크가 복사되었습니다");
      } catch {
        toast("복사 실패, 주소창을 길게 눌러 복사해 주세요");
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-2.5">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper/90 text-point shadow-md backdrop-blur transition-all ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        ↑
      </button>
      <button
        onClick={share}
        aria-label="공유하기"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      </button>
    </div>
  );
}
