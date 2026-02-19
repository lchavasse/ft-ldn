import { motion } from 'framer-motion';
import { useState } from 'react';
import { WaitlistModal } from '../components/WaitlistModal';

export function GetInvolved() {
  const [modalOpen, setModalOpen] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="involved" className="min-h-screen bg-night text-white flex items-center justify-center px-8 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl text-center space-y-12"
      >
        <motion.div variants={textVariants} className="space-y-8">
          <motion.h2
            variants={textVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight"
            style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
          >
            Ready to
            <br />
            Build Tomorrow?
          </motion.h2>

          <motion.div variants={textVariants} className="space-y-6 max-w-2xl mx-auto">
            <p className="text-xl leading-relaxed text-gray-300">
              Frontier Tower is more than a residence—it's a carefully curated community
              of exceptional individuals united by a shared vision for the future.
            </p>

            <p className="text-lg leading-relaxed text-gray-400">
              Applications are open for our founding residents. Join us in creating
              something unprecedented in the heart of London.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={textVariants} className="space-y-8">
          <motion.button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center px-12 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-lg rounded-sm transition-all duration-200 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Waitlist
          </motion.button>

          <motion.p
            variants={textVariants}
            className="text-sm text-gray-400 max-w-md mx-auto"
          >
            Limited founding memberships available. Early supporters receive priority access
            and exclusive benefits.
          </motion.p>
        </motion.div>

        <motion.div
          variants={textVariants}
          className="pt-12 border-t border-gray-600 text-sm text-gray-400"
        >
          <p>© 2024 Frontier Tower London. Building the future, together.</p>
        </motion.div>
      </motion.div>

      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}