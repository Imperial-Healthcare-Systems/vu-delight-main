import { cn } from "@/lib/utils";
import type { BadgeIcon } from "@/lib/types";

const paths: Record<BadgeIcon, React.ReactNode> = {
  leaf: <path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Zm0 0 8-8" />,
  "no-sugar": (
    <>
      <rect x="5" y="9" width="10" height="10" rx="2" />
      <rect x="9" y="5" width="10" height="10" rx="2" />
      <path d="M3 3l18 18" />
    </>
  ),
  "no-preservative": (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
      <path d="M4 4l16 16" />
    </>
  ),
  vegan: <path d="M12 21c-5 0-8-4-8-9 0-4 2-7 4-9 1 3 3 4 4 4s3-1 4-4c2 2 4 5 4 9 0 5-3 9-8 9Zm0 0V9" />,
  "no-palm": (
    <>
      <path d="M12 21v-9M12 12c-4 0-7-3-8-6 4 0 7 1 8 6Zm0 0c4 0 7-3 8-6-4 0-7 1-8 6Zm0-4c-1-3-1-5 0-7 1 2 1 4 0 7Z" />
      <path d="M3 3l18 18" />
    </>
  ),
};

export function BadgeIconSvg({ icon, className }: { icon: BadgeIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cn("h-5 w-5", className)} aria-hidden>
      {paths[icon]}
    </svg>
  );
}

const tones = {
  cream: "bg-cream text-forest border border-forest/15",
  forest: "bg-forest text-cream",
  pink: "bg-pink text-white",
  tangerine: "bg-tangerine text-ink",
  sku: "bg-[var(--sku)] text-[var(--sku-ink)]",
  white: "bg-white text-forest",
};

export function Sticker({
  children,
  icon,
  tone = "cream",
  rotate = 0,
  className,
}: {
  children: React.ReactNode;
  icon?: BadgeIcon;
  tone?: keyof typeof tones;
  rotate?: number;
  className?: string;
}) {
  return (
    <span className={cn("sticker shadow-[0_6px_20px_rgba(1,50,21,.10)]", tones[tone], className)} style={{ transform: `rotate(${rotate}deg)` }}>
      {icon && <BadgeIconSvg icon={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
