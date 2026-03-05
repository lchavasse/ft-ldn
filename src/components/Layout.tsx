import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { id: 'about', number: '01', label: 'About' },
  { id: 'village', number: '02', label: 'The Village' },
  { id: 'join', number: '03', label: 'Join Us' },
  { id: 'faq', number: '04', label: 'FAQ' },
];

export function Layout({ children }: LayoutProps) {
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section') || '');
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="fixed top-0 left-0 h-screen w-1/5 flex flex-col p-8 z-30 border-r border-secondary/15 bg-paper">
          {/* FT Mark */}
          <div className="mb-8">
            <img src="/icon.svg" alt="FT" className="w-10 h-10 mb-3" />
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-secondary leading-relaxed">
              Frontier Tower
              <br />
              London
            </div>
          </div>

          <div className="border-t border-secondary/20 mb-6" />

          {/* Nav */}
          <nav className="flex-1 space-y-5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 group',
                  activeSection === item.id ? 'text-accent' : 'text-secondary hover:text-ink'
                )}
              >
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full border border-current shrink-0 transition-all duration-200',
                    activeSection === item.id && 'bg-accent border-accent'
                  )}
                />
                <span className="tabular-nums">{item.number}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="border-t border-secondary/20 pt-4">
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-secondary/50 leading-relaxed">
              Est. 2026
              <br />
              West London
            </div>
          </div>
        </aside>
      )}

      {/* Mobile menu toggle */}
      {isMobile && (
        <>
          {!mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="fixed top-6 right-6 z-50 font-mono text-[10px] uppercase tracking-widest text-secondary border border-secondary/30 px-3 py-2"
            >
              Menu
            </button>
          )}

          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop — fades out page content below menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-30 bg-paper/60 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Menu panel — sized to content, pinned to top */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-0 left-0 right-0 z-40 flex flex-col p-8 bg-paper border-b border-secondary/20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='16' y1='12' x2='16' y2='20' stroke='%236478a0' stroke-width='1' stroke-opacity='0.1'/%3E%3Cline x1='12' y1='16' x2='20' y2='16' stroke='%236478a0' stroke-width='1' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
                    backgroundSize: '32px 32px',
                  }}
                >
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="self-end font-mono text-[10px] uppercase tracking-widest text-secondary border border-secondary/30 px-3 py-2 mb-8"
                  >
                    Close
                  </button>
                  <img src="/icon.svg" alt="FT" className="w-10 h-10 mb-2" />
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-secondary mb-8">
                    Frontier Tower · London
                  </div>
                  <nav className="space-y-6">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-ink"
                      >
                        <span className="text-secondary tabular-nums">{item.number}</span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      <main className={cn('min-h-screen relative', !isMobile && 'ml-[20%]')}>
        {/* Tower sketch — page-level, spans About + Village */}
        <div className="absolute top-[82vh] right-0 w-[48%] opacity-[0.07] pointer-events-none select-none z-0">
          <img src="/tower_sketch_transparent.png" alt="" className="w-full" />
        </div>
        {children}
      </main>
    </div>
  );
}
