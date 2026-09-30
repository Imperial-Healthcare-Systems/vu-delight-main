"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: () => number;
}

/* ponytail: cart lives in localStorage; swap `persist` storage for the API once /cart exists */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (slug, qty = 1) =>
        set((s) => {
          const ex = s.lines.find((l) => l.slug === slug);
          return {
            lines: ex
              ? s.lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
              : [...s.lines, { slug, qty }],
          };
        }),
      setQty: (slug, qty) =>
        set((s) => ({
          lines: qty <= 0 ? s.lines.filter((l) => l.slug !== slug) : s.lines.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        })),
      remove: (slug) => set((s) => ({ lines: s.lines.filter((l) => l.slug !== slug) })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
    }),
    { name: "vudelight-cart", skipHydration: true },
  ),
);

interface UIState {
  cartOpen: boolean;
  menuOpen: boolean;
  searchOpen: boolean;
  clubOpen: boolean;
  setCart: (v: boolean) => void;
  setMenu: (v: boolean) => void;
  setSearch: (v: boolean) => void;
  setClub: (v: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  menuOpen: false,
  searchOpen: false,
  clubOpen: false,
  setCart: (cartOpen) => set({ cartOpen }),
  setMenu: (menuOpen) => set({ menuOpen }),
  setSearch: (searchOpen) => set({ searchOpen }),
  setClub: (clubOpen) => set({ clubOpen }),
}));
