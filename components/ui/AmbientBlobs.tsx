/** Soft brand-colour blobs drifting behind the light sections. Pure CSS, sits at -z-10 inside an `isolate` parent. */
export function AmbientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <span className="absolute left-[-10vw] top-[4%] h-[38vw] w-[38vw] rounded-full bg-pink/15 blur-3xl animate-[drift_22s_ease-in-out_infinite_alternate]" />
      <span className="absolute right-[-12vw] top-[24%] hidden h-[42vw] w-[42vw] rounded-full bg-tangerine/20 blur-3xl animate-[drift_26s_ease-in-out_infinite_alternate-reverse] md:block" />
      <span className="absolute left-[18vw] top-[52%] h-[34vw] w-[34vw] rounded-full bg-lime/15 blur-3xl animate-[drift_30s_ease-in-out_infinite_alternate]" />
      <span className="absolute right-[8vw] top-[80%] hidden h-[30vw] w-[30vw] rounded-full bg-[#06428A]/10 blur-3xl animate-[drift_24s_ease-in-out_infinite_alternate-reverse] md:block" />
    </div>
  );
}
