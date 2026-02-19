import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

const Navigation = ({ isMobile, isOpen, onToggle }: {
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const navItems = [
    { href: '#hero', label: 'Village' },
    { href: '#manifesto', label: 'Manifesto' },
    { href: '#london', label: 'London' },
    { href: '#involved', label: 'Get Involved' },
  ];

  const navContent = (
    <nav className="space-y-8">
      {navItems.map((item) => (
        <motion.a
          key={item.href}
          href={item.href}
          className="block text-sm uppercase tracking-wide mix-blend-difference text-gray-500 hover:text-accent transition-colors duration-200"
          whileHover={{ x: 4 }}
          onClick={isMobile ? onToggle : undefined}
        >
          {item.label}
        </motion.a>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={onToggle}
          className="fixed top-8 right-8 z-50 text-sm uppercase tracking-wide mix-blend-difference text-gray-500"
        >
          Menu
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-paper z-40 flex items-center justify-center"
            >
              <button
                onClick={onToggle}
                className="absolute top-8 right-8 text-sm uppercase tracking-wide text-gray-500"
              >
                Close
              </button>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navContent}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.aside
      className="fixed top-0 left-0 h-screen w-[260px] p-8 flex flex-col justify-center z-30"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-8">
        <div className="text-sm uppercase tracking-wide mix-blend-difference text-gray-500">
          Frontier Tower
        </div>
        {navContent}
      </div>
    </motion.aside>
  );
};

const RightVisual = () => (
  <motion.aside
    className="hidden lg:block fixed top-0 right-0 h-screen w-[300px] p-8 z-30"
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <div className="h-full flex items-center justify-center">
      <motion.div
        className="w-48 h-64 bg-gray-200 rounded-sm overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000&auto=format&fit=crop"
          alt="Frontier Tower"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  </motion.aside>
);

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation
        isMobile={isMobile}
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <main className={cn(
        "min-h-screen",
        "md:ml-[260px] md:mr-[300px]",
        "transition-all duration-300"
      )}>
        {children}
      </main>

      <RightVisual />
    </div>
  );
}