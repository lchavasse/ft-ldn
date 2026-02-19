import { motion } from 'framer-motion';

export function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: {},
    visible: {}
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-8 py-16">
      <div className="max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={textVariants} className="space-y-4">
            <motion.p
              variants={textVariants}
              className="text-sm uppercase tracking-wide text-gray-500"
            >
              Introducing
            </motion.p>

            <motion.h1
              variants={textVariants}
              className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-ink"
              style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
            >
              Vertical
              <br />
              Village
            </motion.h1>
          </motion.div>

          <motion.div variants={textVariants} className="space-y-6 max-w-2xl">
            <motion.p
              variants={textVariants}
              className="text-xl leading-relaxed text-gray-700"
            >
              A new kind of living space in the heart of London. Where community meets innovation,
              and vertical architecture creates horizontal connections.
            </motion.p>

            <motion.p
              variants={textVariants}
              className="text-lg leading-relaxed text-gray-600"
            >
              Frontier Tower represents the future of urban living—a carefully curated ecosystem
              for creators, innovators, and forward-thinking professionals.
            </motion.p>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="pt-8"
          >
            <motion.a
              href="#manifesto"
              className="inline-block text-sm uppercase tracking-wide text-accent hover:text-ink transition-colors duration-200"
              whileHover={{ x: 4 }}
            >
              Read Our Story →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}