"use client";

import Image from "next/image";
import { useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { useGsap } from "@/lib/gsap";

/**
 * The Big Sign-off. On large screens it sits behind the page (sticky) so the content lifts away to reveal it.
 * Giant stroke wordmark fills letter by letter on hover; a pack rail drifts in with scroll.
 */
export function Footer() {
  const [sent, setSent] = useState(false);
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    if (window.matchMedia("(min-width: 1024px)").matches)
      gsap.from(root.querySelector("[data-inner]"), { yPercent: -18, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
    gsap.from(root.querySelectorAll("[data-pack]"), {
      y: 80,
      rotate: (i) => (i % 2 ? 14 : -14),
      ease: "none",
      stagger: 0.02,
      scrollTrigger: { trigger: root, start: "top 90%", end: "bottom bottom", scrub: 1 },
    });
  });

  const word = "VuDelight";

  return (
    <footer ref={ref} className="relative z-0 overflow-hidden bg-forest text-cream lg:sticky lg:bottom-0" aria-labelledby="footer-heading">
      <div data-inner className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-[3vw] opacity-90">
          {products.slice(0, 8).map((p, i) => (
            <Image key={p.slug} data-pack src={p.image} alt="" width={140} height={220} className={`pack-shadow w-[8vw] max-w-[104px] min-w-[56px] ${i >= 4 ? "hidden md:block" : ""}`} />
          ))}
        </div>

        <div className="container-x relative pt-28 md:pt-32">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>

          <TransitionLink href="/" className="group block select-none" aria-label="VuDelight home">
            <span className="t-display flex flex-wrap leading-[0.8] text-cream">
              {word.split("").map((ch, i) => (
                <span
                  key={i}
                  className="stroke text-cream transition-[color,transform,-webkit-text-fill-color] duration-500 ease-[var(--ease-out-expo)] group-hover:stroke-fill hover:!text-pink hover:-translate-y-2"
                  style={{ transitionDelay: `${i * 35}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </TransitionLink>

          <div className="mt-8 grid gap-12 border-t border-cream/15 pt-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="t-h3 font-display">{site.signature}</p>
              <p className="mt-3 max-w-sm text-sm opacity-70">{site.footer.line}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-6 flex max-w-sm gap-2"
              >
                <input type="email" required placeholder="Email for first-crunch drops" className="field border-cream/40 text-cream" aria-label="Email" />
                <Magnetic>
                  <button type="submit" className="pill bg-pink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-tangerine hover:text-ink">
                    {sent ? "Done" : "Join"}
                  </button>
                </Magnetic>
              </form>
            </div>

            <nav className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3" aria-label="Footer">
              <div>
                <p className="mb-4 font-display text-lg">Shop</p>
                <ul className="flex flex-col gap-2 text-[0.95rem]">
                  <li>
                    <FootLink href="/shop">All products</FootLink>
                  </li>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <FootLink href={`/collections/${c.slug}`}>{c.name}</FootLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 font-display text-lg">Brand</p>
                <ul className="flex flex-col gap-2 text-[0.95rem]">
                  <li>
                    <FootLink href="/story">Our story</FootLink>
                  </li>
                  <li>
                    <FootLink href="/story#compare">How we compare</FootLink>
                  </li>
                  <li>
                    <FootLink href="/contact">Contact</FootLink>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-4 font-display text-lg">Help</p>
                <ul className="flex flex-col gap-2 text-[0.95rem] opacity-80">
                  {site.footer.help.map((h) => (
                    <li key={h}>
                      <span className="cursor-not-allowed opacity-70" title="Coming with the store">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15">
          <Marquee speed={50} className="py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em]">
            {site.claims.map((c) => (
              <span key={c} className="flex items-center gap-6 pr-6">
                {c} <span className="h-1.5 w-1.5 rounded-full bg-tangerine" />
              </span>
            ))}
          </Marquee>
        </div>

        <div className="container-x flex flex-col items-start justify-between gap-4 border-t border-cream/15 py-6 text-xs opacity-70 sm:flex-row sm:items-center">
          <span className="flex items-center gap-3">
            <Logo variant="cream" className="h-6" /> © {new Date().getFullYear()} VuDelight · {site.tagline}
          </span>
          <span>{site.footer.madeIn}</span>
        </div>
      </div>
    </footer>
  );
}

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <TransitionLink href={href} className="group/l inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
      <span className="h-px w-0 bg-tangerine transition-all duration-300 group-hover/l:w-4" />
      {children}
    </TransitionLink>
  );
}
