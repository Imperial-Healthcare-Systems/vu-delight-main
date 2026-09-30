"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { coverPage } from "@/lib/transition";
import { useUI } from "@/lib/store";

/** next/link that plays the curtain before navigating. Falls back to a plain Link for modified clicks. */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const path = usePathname();
  const to = typeof href === "string" ? href : href.pathname ?? "/";

  const handle = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (to.startsWith("http") || to.startsWith("#") || to.startsWith("mailto:")) return;
    e.preventDefault();
    useUI.getState().setMenu(false);
    useUI.getState().setCart(false);
    useUI.getState().setSearch(false);
    useUI.getState().setClub(false);
    if (to === path) return;
    await coverPage();
    router.push(to);
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
