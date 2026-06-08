"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastCtx = { show: (msg: string) => void };
const Ctx = createContext<ToastCtx>({ show: () => {} });

export function useToast() {
  return useContext(Ctx);
}

/**
 * 결과 알림 토스트. 기획서: 1.5초 노출, 동시 1개.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((m: string) => {
    if (timer.current) clearTimeout(timer.current);
    setMsg(m);
    timer.current = setTimeout(() => setMsg(null), 1500);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-6"
      >
        {msg && (
          <div className="animate-fadeIn rounded-full bg-ink/90 px-5 py-2.5 text-sm text-white shadow-lg">
            {msg}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}
