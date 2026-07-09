"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 배경음악(BGM) 플레이어
 * - 기본 상태: 재생
 * - 모바일 자동재생 차단 대응: 첫 터치/스크롤/클릭 시 재생 시도
 * - 우측 상단 원형 토글 버튼(회전하는 음표), 사이트 베이지/화이트 톤
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  // 사용자가 직접 정지를 눌렀는지 — 이 경우 상호작용해도 다시 켜지 않음
  const userPausedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;

    const attempt = () => {
      if (userPausedRef.current) return;
      audio.play().catch(() => {});
    };

    // 1) 즉시 자동재생 시도 (데스크톱 등에서는 바로 재생됨)
    attempt();

    // 2) 차단 시: 첫 사용자 상호작용 시점에 재생
    const onFirst = () => {
      if (!userPausedRef.current && audio.paused) attempt();
    };
    const events = ["pointerdown", "touchstart", "click", "keydown", "scroll"];
    events.forEach((e) =>
      window.addEventListener(e, onFirst, { passive: true })
    );

    // 재생이 시작되면 더 이상 상호작용 리스너 불필요
    const onPlay = () => {
      setPlaying(true);
      events.forEach((e) => window.removeEventListener(e, onFirst));
    };
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      events.forEach((e) => window.removeEventListener(e, onFirst));
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      audio.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      <button
        onClick={toggle}
        aria-label={playing ? "배경음악 일시정지" : "배경음악 재생"}
        aria-pressed={playing}
        className="fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper/85 text-point shadow-md backdrop-blur transition active:scale-95"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={playing ? "animate-[spin_4s_linear_infinite]" : "opacity-70"}
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        {/* 일시정지 상태 표시: 대각선 슬래시 */}
        {!playing && (
          <span className="pointer-events-none absolute h-[1px] w-6 rotate-45 rounded bg-point/70" />
        )}
      </button>
    </>
  );
}
