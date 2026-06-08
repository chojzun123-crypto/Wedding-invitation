"use client";

import Script from "next/script";
import { useEffect } from "react";
import { invitation } from "@/lib/invitation/content";
import Section from "./Section";
import Reveal from "./Reveal";
import PhotoImg from "./PhotoImg";
import { useToast } from "./Toast";

declare global {
  interface Window {
    Kakao?: any;
  }
}

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY || "";

export default function Share() {
  const { meta, groom, bride, wedding } = invitation;
  const { show } = useToast();

  useEffect(() => {
    if (KAKAO_KEY && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }
  }, []);

  const pageUrl = typeof window !== "undefined" ? window.location.href : meta.url;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      show("링크가 복사되었습니다");
    } catch {
      show("복사 실패, 주소창을 길게 눌러 복사해 주세요");
    }
  };

  const shareKakao = () => {
    const Kakao = window.Kakao;
    if (KAKAO_KEY && Kakao && Kakao.isInitialized()) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: meta.title,
          description: meta.description,
          imageUrl: meta.url.replace(/\/$/, "") + meta.ogImage,
          link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
          },
        ],
      });
      return;
    }
    // 폴백: Web Share API → 링크 복사
    if (navigator.share) {
      navigator
        .share({ title: meta.title, text: meta.description, url: pageUrl })
        .catch(() => {});
    } else {
      copyLink();
    }
  };

  return (
    <Section className="bg-paper pb-24">
      {KAKAO_KEY && (
        <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" strategy="afterInteractive" />
      )}

      <Reveal className="mx-auto max-w-card text-center">
        <div className="mx-auto mb-8 w-40 overflow-hidden rounded-full border border-line">
          <PhotoImg
            src="/gallery/closing.jpg"
            alt="마무리 사진"
            index={0}
            className="aspect-square w-full object-cover"
          />
        </div>

        <p className="font-serif text-[17px] leading-[2] text-ink/85">
          소중한 분들을 모시고
          <br />
          저희의 시작을 함께 나누고자 합니다.
        </p>
        <p className="mt-6 font-serif text-lg text-ink">
          {groom.name} <span className="text-accent">·</span> {bride.name}
        </p>
        <p className="mt-1 text-sm text-sub">
          {wedding.dateText} {wedding.timeText}
        </p>

        <div className="mt-9 space-y-2.5">
          <button
            onClick={shareKakao}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3.5 text-sm font-medium text-ink shadow-sm active:scale-[0.98]"
          >
            <span aria-hidden>💬</span> 카카오톡으로 공유하기
          </button>
          <button
            onClick={copyLink}
            className="w-full rounded-xl border border-line bg-paper py-3.5 text-sm font-medium text-point active:scale-[0.98]"
          >
            청첩장 주소 복사하기
          </button>
        </div>

        <p className="mt-12 text-xs text-sub/70">Thank you for celebrating with us</p>
      </Reveal>
    </Section>
  );
}
