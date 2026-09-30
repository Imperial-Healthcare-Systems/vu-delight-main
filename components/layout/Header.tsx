"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { TransitionLink } from "./TransitionLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MobileMenu } from "./MobileMenu";
import { useCart, useUI } from "@/lib/store";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Floating island nav. Always visible so the brand never leaves the screen; the announcement
 * strip folds away on scroll and the island tightens. Logo left, links centre, search / club / bag right.
 */
export function Header() {
  const path = usePathname();
  const { setCart, menuOpen, setMenu, setSearch, setClub } = useUI();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        <div className={cn("overflow-hidden bg-forest text-cream transition-[max-height,opacity] duration-500 ease-[var(--ease-out-expo)]", scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100")}>
          <Marquee speed={40} skew={false} className="h-8 text-[0.72rem] font-semibold uppercase tracking-[0.18em] md:text-[0.68rem]">
            {site.announcements.map((a, i) => (
              <span key={a} className="flex items-center gap-8 pl-4 pr-4 leading-8">
                {a} <span className={cn("h-1 w-1 rounded-full", i % 2 ? "bg-pink" : "bg-tangerine")} />
              </span>
            ))}
          </Marquee>
        </div>

        <div className="container-x">
          <div
            className={cn(
              "mt-3 flex items-center justify-between gap-3 rounded-full border border-forest/10 bg-cream/85 pl-3 pr-2 shadow-[0_12px_40px_rgba(1,50,21,.12)] backdrop-blur-xl transition-[padding,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] sm:pl-4",
              scrolled ? "bg-cream/92 py-1.5 shadow-[0_8px_30px_rgba(1,50,21,.16)]" : "py-2",
            )}
          >
            <TransitionLink href="/" aria-label="VuDelight home" className="shrink-0 py-1">
              <Logo className="h-9 md:h-10" priority />
            </TransitionLink>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {site.nav.map((n) => (
                <Magnetic key={n.href} strength={0.15}>
                  <TransitionLink
                    href={n.href}
                    className={cn(
                      "pill block px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300 hover:bg-forest hover:text-cream",
                      active(n.href) && "bg-forest text-cream",
                    )}
                  >
                    {n.label}
                  </TransitionLink>
                </Magnetic>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button onClick={() => setSearch(true)} className="pill grid h-11 w-11 place-items-center transition-colors hover:bg-forest hover:text-cream md:h-10 md:w-10" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m20 20-4.2-4.2" />
                </svg>
              </button>
              <button onClick={() => setClub(true)} className="pill hidden h-10 w-10 place-items-center transition-colors hover:bg-forest hover:text-cream sm:grid" aria-label="Delight Club">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
                </svg>
              </button>
              <button
                onClick={() => setCart(true)}
                className="pill relative flex items-center gap-2 bg-forest px-3.5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-pink sm:px-4 md:py-2.5"
                aria-label={`Open bag, ${count} items`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M6 7h12l1 13H5L6 7Zm3 0a3 3 0 0 1 6 0" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Bag</span>
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-tangerine px-1 text-[0.7rem] text-ink">{count}</span>
              </button>
              <button
                onClick={() => setMenu(!menuOpen)}
                className="pill flex h-11 w-11 flex-col items-center justify-center gap-1.5 border-[1.5px] border-current lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label="Menu"
              >
                <span className={cn("block h-[1.5px] w-4 bg-current transition-transform", menuOpen && "translate-y-[3.5px] rotate-45")} />
                <span className={cn("block h-[1.5px] w-4 bg-current transition-transform", menuOpen && "-translate-y-[3.5px] -rotate-45")} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
