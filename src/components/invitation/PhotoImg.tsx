"use client";

import { useState } from "react";

/**
 * 사진 로드 실패 시(파일 미존재 등) 자동으로 플레이스홀더로 대체.
 * 실제 사진은 public/gallery/ 에 넣으면 그대로 표시됩니다.
 */
export default function PhotoImg({
  src,
  alt,
  index,
  className = "",
}: {
  src: string;
  alt: string;
  index?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-line/60 to-ivory text-sub ${className}`}
        aria-label={alt}
        role="img"
      >
        <div className="flex flex-col items-center gap-1 opacity-70">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="M21 16l-5-5L5 19" />
          </svg>
          {typeof index === "number" && (
            <span className="text-[11px] tracking-wide">사진 {index}</span>
          )}
        </div>
      </div>
    );
  }

  // 정적 export 친화적으로 <img> 사용 (next/image 도메인 설정 불필요)
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
