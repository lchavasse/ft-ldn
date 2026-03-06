import { motion } from 'framer-motion';
import { DashedDivider } from '../components/DesignElements';

export function About() {
  return (
    <>
      <DashedDivider />
      <section
        className="py-14 pl-8 md:pl-12 pr-4 md:max-[1599px]:pr-16 min-[1600px]:pr-[14%]"
      >
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p
            className="font-serif text-ink leading-snug"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontStyle: 'italic',
              fontVariationSettings: '"SOFT" 100, "WONK" 0',
            }}
          >
            "Think a cross between WeWork,
            <br />
            Soho House, and Burning Man."
          </p>
          <footer className="font-mono text-sm text-secondary">
            We did this in SF, and we're bringing some of that energy to London.
          </footer>
        </motion.blockquote>
      </section>
    </>
  );
}
