import Image from "next/image";
import { Button, Arrow } from "@/components/ui/Button";
import { Hi } from "@/components/ui/Hi";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-[var(--header-h)] text-center">
      <div className="relative mb-8 h-40 w-40">
        <span className="absolute inset-0 rounded-full bg-pink/15" />
        <Image src="/products/mix-fruit.png" alt="" width={120} height={190} className="pack-shadow absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 rotate-12" />
      </div>
      <h1 className="t-h1 font-display text-forest">
        Empty <Hi>bag.</Hi>
      </h1>
      <p className="t-lead mt-4 max-w-md opacity-75">That page is not here. The snacks, however, are.</p>
      <Button href="/shop" className="mt-8" size="lg">
        Back to the shop <Arrow />
      </Button>
    </section>
  );
}
