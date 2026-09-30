"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { featured } from "@/content/products";
import { useGsap } from "@/lib/gsap";
import { useUI } from "@/lib/store";
import { cn, skuVars } from "@/lib/utils";
import { Sticker } from "@/components/ui/Sticker";
import { Hi } from "@/components/ui/Hi";

const KEY = "vud-club";

/** Appears 2.4s after first visit. Pack composition on SKU colour, one field, one button. */
export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const { clubOpen, setClub } = useUI();
  const visible = open || clubOpen;
  const input = useRef<HTMLInputElement>(null);
  const hero = featured[0];

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    // wait for the preloader to finish, then give the hero a moment before asking anything
    let t: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      t = setTimeout(() => setOpen(true), 2600);
    };
    if (document.documentElement.dataset.loaded) arm();
    else window.addEventListener("vud:loaded", arm, { once: true });
    return () => {
      window.removeEventListener("vud:loaded", arm);
      if (t) clearTimeout(t);
    };
  }, []);

  const close = useCallback(() => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
    setClub(false);
  }, [setClub]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => input.current?.focus(), 500);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [visible, close]);

  const ref = useGsap<HTMLDivElement>(
    ({ gsap, root, reduced }) => {
      if (!visible || reduced) return;
      gsap.from(root.querySelector("[data-card]"), { y: 60, scale: 0.94, opacity: 0, duration: 0.9, ease: "expo.out" });
      gsap.from(root.querySelectorAll("[data-pack]"), { y: 120, rotate: 20, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.25 });
      gsap.to(root.querySelectorAll("[data-pack]"), { y: "-=10", duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.3, delay: 1.3 });
    },
    [visible],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true); // ponytail: POST /subscribe once the backend exists
    setTimeout(close, 1400);
  };

  return (
    <div ref={ref} className={cn("fixed inset-0 z-[80] grid place-items-center p-4", visible ? "" : "pointer-events-none")} aria-hidden={!visible}>
      <button
        className={cn("absolute inset-0 bg-forest/50 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
        onClick={close}
        aria-label="Dismiss"
        tabIndex={visible ? 0 : -1}
      />
      {visible && (
        <div
          data-card
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
          className="relative grid max-h-[92svh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-[1.5rem] bg-cream shadow-2xl md:grid-cols-2 md:rounded-[2rem]"
          style={skuVars(hero.accent, hero.ink, hero.soft)}
        >
          <div className="sku-bg noise relative min-h-52 overflow-hidden md:min-h-full">
            <p className="t-display absolute -left-4 top-4 select-none opacity-15" aria-hidden>
              Yum
            </p>
            {featured.slice(0, 3).map((p, i) => (
              <Image
                key={p.slug}
                data-pack
                src={p.image}
                alt=""
                width={200}
                height={320}
                className={cn("pack-shadow absolute w-[42%]", i === 0 && "bottom-[-8%] left-[8%] -rotate-12", i === 1 && "bottom-[-4%] left-[32%] z-10 w-[46%]", i === 2 && "bottom-[-10%] right-[4%] rotate-12")}
              />
            ))}
            <Sticker tone="cream" rotate={-6} className="absolute left-5 top-5">
              Delight Club
            </Sticker>
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 md:gap-5 md:p-10">
            <button onClick={close} className="pill absolute right-4 top-4 h-9 w-9 border-[1.5px] border-current text-lg leading-none" aria-label="Close">
              ×
            </button>
            <h2 id="welcome-title" className="t-h2 font-display">
              {site.modal.title} <Hi color="tangerine">{site.modal.mark}</Hi>
            </h2>
            <p className="opacity-75">{site.modal.copy}</p>
            {done ? (
              <p className="pill bg-forest px-5 py-3 text-center font-semibold text-cream">You are in. Watch your inbox.</p>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3">
                <input ref={input} type="email" required placeholder="you@somewhere.in" className="field" aria-label="Email" />
                <div className="flex gap-3">
                  <button type="submit" className="pill flex-1 bg-pink py-3 font-semibold text-white transition-colors hover:bg-pink-ink">
                    {site.modal.cta}
                  </button>
                  <button type="button" onClick={close} className="pill px-5 py-3 text-sm underline-offset-4 hover:underline">
                    {site.modal.dismiss}
                  </button>
                </div>
              </form>
            )}
            <p className="text-xs opacity-50">No spam. Unsubscribe whenever.</p>
          </div>
        </div>
      )}
    </div>
  );
}
