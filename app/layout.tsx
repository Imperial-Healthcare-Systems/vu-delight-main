import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { WelcomeModal } from "@/components/layout/WelcomeModal";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CursorDot } from "@/components/ui/CursorDot";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ParallaxLayers } from "@/components/motion/ParallaxLayers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website", siteName: site.name },
  icons: { icon: "/brand/logo-forest.png" },
};

export const viewport: Viewport = { themeColor: "#013215", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dm.variable}`}>
      <body className="bg-cream text-ink">
        <Preloader />
        <PageTransition />
        <SmoothScroll />
        <ScrollProgress />
        <ParallaxLayers />
        <Header />
        {/* main sits above the sticky footer; the page lifts away to reveal it */}
        <main id="main" className="relative z-10 overflow-x-clip bg-cream shadow-[0_40px_80px_rgba(1,50,21,.25)]">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <WelcomeModal />
        <CursorDot />
      </body>
    </html>
  );
}
