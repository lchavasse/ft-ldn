import { motion } from 'framer-motion';

export function Manifesto() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="manifesto" className="min-h-screen flex items-center justify-center px-8 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-prose space-y-12"
      >
        <motion.div variants={textVariants} className="space-y-8">
          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl font-serif leading-tight text-ink"
            style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
          >
            The Future of
            <br />
            Urban Living
          </motion.h2>

          <motion.div variants={textVariants} className="space-y-8 text-lg leading-relaxed text-gray-700">
            <p>
              We believe cities are not just places where people work and sleep,
              but ecosystems where ideas flourish, connections deepen, and the future is built
              through meaningful collaboration.
            </p>

            <p>
              Frontier Tower is designed as a vertical village—a place where the boundaries
              between living, working, and creating dissolve into something more profound:
              a community of purpose-driven individuals shaping tomorrow.
            </p>

            <p>
              Every detail, from the architecture to the resident selection process,
              is intentionally crafted to foster serendipitous encounters and deep,
              lasting relationships between remarkable people.
            </p>

            <p className="text-xl font-medium text-ink">
              This is not just a building.
              <br />
              It's a movement.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={textVariants}
          className="pt-8 border-t border-gray-200"
        >
          <motion.a
            href="#london"
            className="inline-block text-sm uppercase tracking-wide text-accent hover:text-ink transition-colors duration-200"
            whileHover={{ x: 4 }}
          >
            Discover London →
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}