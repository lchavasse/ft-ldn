import { motion } from 'framer-motion';
import { DashedDivider, SectionLabel } from '../components/DesignElements';

const membershipIncludes = [
  'All common areas',
  'Conference rooms (fair use)',
  'Event space (fair use)',
  'One specialist community',
  'Global FT network',
  'Generous guest policy',
];

interface JoinUsProps {
  onApply: () => void;
}

export function JoinUs({ onApply }: JoinUsProps) {
  return (
    <>
      <DashedDivider />
      <section
        id="join"
        data-section="join"
        className="py-14 md:py-24 md:pl-12 md:max-[1599px]:pr-16 min-[1600px]:pr-[14%]"
      >
        <SectionLabel number="03" title="Join Us" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-start max-w-6xl mx-auto">
          {/* Left — expressive type list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 overflow-hidden max-w-[480px]"
          >
            <h2
              className="font-serif text-ink leading-[0.9] select-none"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                fontVariationSettings: '"SOFT" 100, "WONK" 0',
                letterSpacing: '-0.015em',
              }}
            >
              <span className="flex justify-between leading-13">
                <p>Founders. Engineers. <span className="text-secondary">Scientists.</span> Builders. Designers. <span className="text-secondary">Musicians.</span> Artists.</p>
              </span>
            </h2>

            <p className="font-mono text-sm text-secondary leading-relaxed max-w-sm">
              If you have a burning drive to improve the world around you — you belong here.
            </p>
          </motion.div>

          {/* Right — membership card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white/70 border border-ink p-5 shadow-[4px_4px_0px_#1a1814]">
              {/* Card header */}
              <div className="space-y-0.5 mb-4">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-secondary">
                  Founding Citizen
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-secondary/60">
                  Monthly
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b border-dashed border-secondary/30">
                <div className="flex items-baseline gap-2">
                  <div
                    className="font-serif text-4xl text-ink"
                    style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
                  >
                    £140
                  </div>
                  <div className="font-mono text-[11px] text-secondary">/ month</div>
                </div>
                <div className="mt-2">
                  <span className="font-mono text-[10px] italic text-secondary border border-secondary/30 px-2 py-0.5">
                    20% off on annual billing
                  </span>
                </div>
              </div>

              {/* Includes */}
              <div className="space-y-2 mb-5">
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary/60 mb-2">
                  Includes:
                </div>
                {membershipIncludes.map((item) => (
                  <div key={item} className="flex items-start gap-3 font-mono text-xs text-ink">
                    <span className="text-accent mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={onApply}
                className="w-full border border-ink font-mono text-[11px] uppercase tracking-[0.2em] py-3 px-6 text-ink hover:bg-ink hover:text-paper transition-all duration-200"
              >
                Apply to the Waitlist →
              </button>

              <p className="font-mono text-[9px] text-secondary/60 mt-3 text-center">
                Lock in your place with the first month's deposit — refunded if we don't open.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
