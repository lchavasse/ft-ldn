import { useState } from 'react';
import { motion } from 'framer-motion';
import { AxisCross, RegistrationMark, TapeStrip } from '../components/DesignElements';
import { WaitlistModal } from '../components/WaitlistModal';

const ease = [0.16, 1, 0.3, 1] as const;

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 md:pl-12 md:pr-16 min-[1600px]:pr-[14%] py-20 relative overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center max-w-6xl">
        {/* Headline block */}
        <div className="flex-1 space-y-8 min-w-0">
          <motion.h1
            {...anim(0.1)}
            className="font-serif text-ink leading-[0.88]"
            style={{
              fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
              fontVariationSettings: '"SOFT" 100, "WONK" 0',
            }}
          >
            A <span style={{ fontStyle: 'italic' }}>Vertical Village</span>
          </motion.h1>

          <motion.p
            {...anim(0.15)}
            className="font-serif text-ink leading-snug"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.75rem)',
              fontVariationSettings: '"SOFT" 100, "WONK" 0',
            }}
          >
            for Frontier Technologies &amp; Creative Arts.
          </motion.p>

          <motion.p
            {...anim(0.3)}
            className="font-mono text-sm text-secondary leading-relaxed max-w-md"
          >
            We're transforming a tower in the heart of West London into a hub for the
            creators and innovators pushing boundaries of what's possible to build the future.
          </motion.p>

          <motion.div
            {...anim(0.45)}
            className="flex flex-wrap items-center gap-5"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper transition-all duration-200"
            >
              Apply to the Waitlist →
            </button>
            <a
              href="#about"
              className="font-mono text-[11px] text-secondary tracking-[0.15em] uppercase hover:text-ink transition-colors duration-200"
            >
              Learn More ↓
            </a>
          </motion.div>
        </div>

        {/* Pinned tower image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="relative w-full sm:w-96 xl:w-[520px] sm:shrink-0"
        >
          {/* Axis crosses */}
          <AxisCross className="absolute -top-5 -left-5 z-10" />
          <AxisCross className="absolute -bottom-5 -right-5 z-10" />

          {/* Tape */}
          <TapeStrip className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20" />

          <div
            className="relative bg-white p-3 shadow-[6px_8px_32px_rgba(0,0,0,0.13)]"
          >
            <img
              src="/ft-ldn-hero.png"
              alt="Frontier Tower, West London"
              className="w-full block"
            />
            <RegistrationMark className="absolute bottom-5 right-5" />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-8 md:left-12 font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/50"
      >
        Scroll to explore ↓
      </motion.div>

      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
