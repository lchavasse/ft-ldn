import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DashedDivider, SectionLabel, RegistrationMark, TapeStrip } from '../components/DesignElements';

const cards = [
  {
    number: '01',
    title: 'A Social Hub',
    body: 'Café. Coworking. Gym. Event space. The kind of place you actually want to spend your day.',
    image: '/card1.png',
    caption: 'Social Spaces',
    rotation: -1.5,
  },
  {
    number: '02',
    title: 'Your Specialist Community',
    body: 'Every floor is its own world — self-governed, curated, and obsessed with one corner of the future. Find your people. Then meet everyone else.',
    image: '/card2.png',
    caption: 'Maker Ecosystem',
    rotation: 1.2,
  },
  {
    number: '03',
    title: 'One Collaborative Ecosystem',
    body: 'Labs, makerspaces, robots, open doors. Frontier Tower citizens move freely between floors. The best collisions are the unplanned ones.',
    image: '/card3.png',
    caption: 'Community Events',
    rotation: -0.8,
  },
];

export function Village() {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive(index);
  };

  const prev = () => goTo((active - 1 + cards.length) % cards.length);
  const next = () => goTo((active + 1) % cards.length);

  const card = cards[active];

  return (
    <>
      <DashedDivider />
      <section
        id="village"
        data-section="village"
        className="py-14 md:py-24 pl-8 md:pl-12 pr-4 md:max-[1599px]:pr-16 min-[1600px]:pr-[14%] relative"
      >
        <SectionLabel number="02" title="The Village" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif leading-tight text-ink mb-12"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontVariationSettings: '"SOFT" 100, "WONK" 0',
          }}
        >
          How the Vertical Village Works
        </motion.h2>

        <div className="relative z-10 max-w-2xl mx-4 sm:mx-8 md:ml-[14%] md:mr-0">
          <div className="border border-secondary/20">
            {/* Carousel */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col md:flex-row md:items-stretch"
                >
                  {/* Image panel */}
                  <div className="w-full md:w-[44%] md:shrink-0 relative p-6 md:p-8 flex items-center justify-center">
                    <TapeStrip className="absolute top-9 left-1/2 -translate-x-1/2 z-10" />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full block"
                      style={{
                        transform: `rotate(${card.rotation}deg)`,
                        filter: 'drop-shadow(4px 6px 20px rgba(0,0,0,0.12))',
                      }}
                    />
                    <RegistrationMark className="absolute bottom-4 right-4" />
                  </div>

                  {/* Divider — horizontal on mobile, vertical on desktop */}
                  <div className="md:hidden border-t border-secondary/20" />
                  <div className="hidden md:flex border-l border-secondary/20 shrink-0" />

                  {/* Text panel */}
                  <div className="flex-1 p-8 flex flex-col justify-center space-y-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/55">
                      {card.number} / {card.caption}
                    </div>
                    <h3
                      className="font-serif text-2xl text-ink leading-snug"
                      style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
                    >
                      {card.title}
                    </h3>
                    <p className="font-mono text-sm text-secondary leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="border-t border-secondary/20 px-8 py-4 flex items-center gap-6">
              <button
                onClick={prev}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary hover:text-ink transition-colors duration-150"
              >
                ← Prev
              </button>
              <span className="font-mono text-[10px] text-secondary/50 tabular-nums">
                {String(active + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
              </span>
              <button
                onClick={next}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary hover:text-ink transition-colors duration-150"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
