import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashedDivider } from '../components/DesignElements';
import { WaitlistModal } from '../components/WaitlistModal';

export function CTABand() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <DashedDivider />
      <section className="py-24 pl-8 md:pl-12 pr-4 md:pr-16 min-[1600px]:pr-[14%] bg-ink/[0.025]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center"
        >
          {/* Left */}
          <div className="space-y-5">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-secondary/70">
              Start Your Journey
            </div>
            <h2
              className="font-serif text-ink leading-tight"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontVariationSettings: '"SOFT" 100, "WONK" 0',
              }}
            >
              Apply for a Founding Citizenship
            </h2>
            <p className="font-mono text-sm text-secondary leading-relaxed max-w-sm">
              Applications are open. Become a founding citizen of Frontier Tower London.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="font-mono text-sm text-secondary leading-relaxed lg:text-right max-w-xs">
              Become a founding citizen of Frontier Tower London.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="border border-ink font-mono text-[11px] uppercase tracking-[0.2em] py-4 px-10 text-ink hover:bg-ink hover:text-paper transition-all duration-200"
            >
              Apply Now →
            </button>
            <a
              href="mailto:hello@frontiertower.io"
              className="font-mono text-[11px] text-secondary uppercase tracking-[0.15em] hover:text-ink transition-colors duration-200"
            >
              Contact Us →
            </a>
          </div>
        </motion.div>
      </section>

      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
