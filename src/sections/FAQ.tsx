import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DashedDivider, SectionLabel } from '../components/DesignElements';

const faqs = [
  {
    q: 'Why are you doing this?',
    a: "Commercial real estate is in crisis — 20–30% vacancy rates across major cities. We think that's an opportunity. Frontier Tower exists to reclaim that space from institutional landlords and give it back to the people actually building the future.",
  },
  {
    q: 'Why should I join?',
    a: "This isn't just another real estate play. We're building self-governed vertical villages — combining the warmth of a close-knit neighbourhood with the infrastructure of a serious city. Join as a founding citizen and help shape what this becomes.",
  },
  {
    q: 'Are you fully operational from day one?',
    a: "We're building in public and opening to members in parallel. The first months will be fluid — but we think that's the right way to build something genuinely community-owned. You won't just be a member. You'll be a co-creator.",
  },
  {
    q: "I want to contribute but don't have time. Is there another way?",
    a: 'Have you considered sponsoring a floor? Get in touch: sponsorship@frontiertower.io',
  },
  {
    q: 'Am I the right fit?',
    a: "If you work in frontier technology or arts and music, almost certainly yes. We're looking for curious, open-minded people who want a real impact on what's coming next. Still unsure? Join our Luma calendar and come to an event first.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <DashedDivider />
      <section
        id="faq"
        data-section="faq"
        className="py-14 md:py-24 pl-8 md:pl-12 pr-4 md:max-[1599px]:pr-16 min-[1600px]:pr-[14%]"
      >
        <SectionLabel number="04" title="Questions" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="font-serif leading-tight text-ink mb-8"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              fontVariationSettings: '"SOFT" 100, "WONK" 0',
            }}
          >
            Find answers to your questions about
            our village, membership, and community.
          </h2>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-dashed border-secondary/30">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-mono text-sm text-ink group-hover:text-accent transition-colors duration-150 pr-8">
                    {faq.q}
                  </span>
                  <span
                    className="font-mono text-lg text-secondary shrink-0 transition-transform duration-200 leading-none"
                    style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 border-l-2 border-secondary/20 mb-4">
                        <p className="font-mono text-xs text-secondary leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="border-t border-dashed border-secondary/30 pt-6">
              <p className="font-mono text-xs text-secondary">
                Still have questions?{' '}
                <a
                  href="mailto:hello@frontiertower.io"
                  className="text-ink underline underline-offset-2 hover:text-accent transition-colors"
                >
                  Contact Us →
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
