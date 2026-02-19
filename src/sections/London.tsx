import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function London() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      ref={ref}
      id="london"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="w-full h-[120%] bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop"
            alt="London cityscape"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-8 py-16 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.div variants={textVariants} className="space-y-8">
            <motion.h2
              variants={textVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-white"
              style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
            >
              London
              <br />
              Calling
            </motion.h2>

            <motion.div variants={textVariants} className="space-y-6 max-w-2xl">
              <p className="text-xl leading-relaxed text-gray-200">
                In the heart of one of the world's greatest cities, Frontier Tower rises
                as a beacon for the next generation of builders, creators, and visionaries.
              </p>

              <p className="text-lg leading-relaxed text-gray-300">
                From Shoreditch's creative energy to Canary Wharf's financial prowess,
                from the historic corridors of Westminster to the innovation labs of King's Cross—
                London pulses with possibility.
              </p>

              <p className="text-lg leading-relaxed text-gray-300">
                Our location isn't just strategic; it's inspirational. Surrounded by centuries
                of innovation and steps away from tomorrow's breakthroughs.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="pt-8 border-t border-gray-400"
          >
            <motion.a
              href="#involved"
              className="inline-block text-sm uppercase tracking-wide text-accent hover:text-white transition-colors duration-200"
              whileHover={{ x: 4 }}
            >
              Join the Movement →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}