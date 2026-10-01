"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { coverPage } from "@/lib/transition";
import { scrollTo } from "@/lib/lenis";
import { useUI } from "@/lib/store";

/**
 * next/link that plays the curtain before navigating.
 * Same page, different anchor → smooth-scroll there, no curtain. Same page, no anchor → nothing.
 * Modified clicks (new tab) and external links fall through to the plain Link.
 */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const path = usePathname();
  const to = typeof href === "string" ? href : href.pathname ?? "/";

  const handle = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (to.startsWith("http") || to.startsWith("#") || to.startsWith("mailto:")) return;
    e.preventDefault();
    const ui = useUI.getState();
    ui.setMenu(false);
    ui.setCart(false);
    ui.setSearch(false);
    ui.setClub(false);
    const [toPath, hash] = to.split("#");
    if (toPath.split("?")[0] === path) {
      if (hash) {
        history.replaceState(null, "", `#${hash}`);
        scrollTo(`#${hash}`, -96);
      }
      return;
    }
    await coverPage();
    router.push(to);
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
