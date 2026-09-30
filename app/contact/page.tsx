import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Contact", description: "Wholesale, gifting, collabs or just a craving." };

export default function Contact() {
  return (
    <>
      <PageHero title="Say" mark="hi." copy="Wholesale, gifting, collabs or just a craving. Tell us which and we will write back like humans." />
      <section className="container-x grid gap-12 pb-24 md:grid-cols-12 md:pb-32" aria-label="Contact form">
        <Reveal className="md:col-span-4">
          {[
            ["Orders", "Something wrong with a bag? We fix it first, ask questions later."],
            ["Wholesale & gifting", "Cafés, corporate boxes, weddings. Tell us the headcount."],
            ["Press & collabs", "Creators, chefs, nutritionists. We love a shared kitchen."],
          ].map(([t, c]) => (
            <div key={t} data-item className="border-t border-forest/15 py-6">
              <h2 className="t-h3 font-display">{t}</h2>
              <p className="mt-2 opacity-75">{c}</p>
            </div>
          ))}
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
