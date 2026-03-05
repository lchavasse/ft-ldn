import { DashedDivider } from '../components/DesignElements';

const communities = [
  'Deep Tech',
  'AI × Robotics',
  'NeuroTech',
  'Energy',
  'Materials & Manufacturing',
  'Frontier Maker Space',
  'Arts & Music',
  'Biotech',
  'SpaceTech',
  'Ethereum & Web3',
  'Creative Media',
];

export function Footer() {
  return (
    <footer>
      <DashedDivider />

      <div className="pl-8 md:pl-12 pr-4 md:pr-16 min-[1600px]:pr-[14%] py-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 mb-8">
          {/* Left: mark + newsletter + socials */}
          <div className="space-y-7">
            <div>
              <img src="/horizontal-logo.png" alt="Frontier Tower" className="h-8 mb-6" />
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs text-secondary">Subscribe to stay in the loop.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="email address"
                  className="font-mono text-xs bg-transparent border border-secondary/35 px-4 py-2.5 text-ink placeholder:text-secondary/35 focus:outline-none focus:border-ink flex-1 max-w-56"
                />
                <button className="font-mono text-[10px] uppercase tracking-widest border border-l-0 border-secondary/35 px-4 py-2.5 text-secondary hover:border-ink hover:text-ink transition-colors duration-200 shrink-0">
                  Subscribe
                </button>
              </div>
              <p className="font-mono text-[9px] text-secondary/45">
                · Unsubscribe anytime &nbsp;·&nbsp; Good updates only
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              {['Telegram', 'Instagram', 'LinkedIn', 'X'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200 uppercase tracking-wider"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Right: link columns */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50 mb-4">
                Company
              </div>
              {['Apply Now', 'Join the Discussion'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200"
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50 mb-4">
                Legal
              </div>
              {['Terms & Conditions', 'Privacy Policy'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/20 pt-6">
          <p className="font-mono text-[9px] text-secondary/45 uppercase tracking-widest">
            ©2026 Frontier Tower. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Community ticker */}
      <div className="bg-ink overflow-hidden py-3 border-t border-secondary/10">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'ticker 35s linear infinite' }}
        >
          {[...communities, ...communities].map((c, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-paper/50 px-12 shrink-0">
              {c}{' '}
              <span className="text-accent/70 mx-1">×</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
