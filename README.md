# 조경준 ♥ 박혜림 모바일 청첩장

Next.js(App Router) + TypeScript + Tailwind 기반 모바일 청첩장입니다.
기획서 `SCR-INV-001` 중 **정적 8개 섹션**(Hero·인사말·예식안내·갤러리·오시는길·계좌·연락처·공유)을 구현했습니다.
방명록(S8)·하객 사진 업로드(S9)는 Supabase/S3 연동이 필요해 제외했습니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 빌드
```

## 내용 수정 — 여기 한 곳만 고치면 됩니다

`src/lib/invitation/content.ts`

계약서에서 확정 반영한 값:
- 예식: **2026년 10월 4일 (일) 오전 11시 50분 · 호텔 ICC 3층 그랜드볼룸**
- 주소: 대전광역시 유성구 엑스포로123번길 55 (042-555-5100)
- 신랑 조경준 (조장희·이정란의 장남) / 010-6533-3705
- 신부 박혜림 (어머니 김선미) / 010-2430-6506

**교체 필요한 항목(코드에 `TODO`로 표시):**
- 🔸 신부 **아버지 성함** — 계약서 미기재라 `박○○`로 둠
- 🔸 **계좌번호** — 현재 예시값(실제 계좌 아님)
- 🔸 **인사말** — 샘플 문구
- 🔸 예식장 **좌표(lat/lng)** — 정확값 입력 시 길찾기/지도 정확도 향상
- 🔸 `meta.url` — 배포 도메인으로 교체(OG 공유용)

## 사진 넣기

`public/gallery/` 에 아래 이름으로 넣으면 자동 반영됩니다(없으면 플레이스홀더 표시):
- `main.jpg` — Hero 메인
- `1.jpg` ~ `8.jpg` — 갤러리
- `closing.jpg` — 마무리

## 카카오톡 공유(선택)

`.env.local` 에 키를 넣으면 카카오 공유가 활성화됩니다(없으면 Web Share/링크복사로 폴백):

```
NEXT_PUBLIC_KAKAO_KEY=카카오_JavaScript_키
```

## OG 이미지

`public/og.png` (1200×630) 를 넣어주세요. 카카오톡/링크 공유 미리보기에 사용됩니다.

## 배포 (Vercel)

GitHub 연결 후 Vercel import → 환경변수(`NEXT_PUBLIC_KAKAO_KEY`) 설정 → 배포.
배포 후 `content.ts` 의 `meta.url` 을 실제 도메인으로 바꾸면 OG 미리보기가 정확해집니다.
