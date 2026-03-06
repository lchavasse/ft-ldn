import React, { useState } from 'react';
import { DashedDivider } from '../components/DesignElements';

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    {children}
  </svg>
);

const socialLinks = [
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/CchkLAJxDNC4fF3UNf6Ei8?mode=hqctcli' },
  { label: 'Instagram', href: 'https://instagram.com/frontiertower' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/frontiertower' },
  { label: 'X', href: 'https://x.com/frontiertower' },
] as const;

const legalLinks = [
  { label: 'Terms & Conditions', href: 'https://frontiertower.io/terms' },
  { label: 'Privacy Policy', href: 'https://frontiertower.io/privacy-policy' },
] as const;

const communities = [
  {
    label: 'Deep Tech',
    icon: (
      <Icon>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </Icon>
    ),
  },
  {
    label: 'AI × Robotics',
    icon: (
      <Icon>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4M8 16h.01M16 16h.01" />
      </Icon>
    ),
  },
  {
    label: 'NeuroTech',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="1" />
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
      </Icon>
    ),
  },
  {
    label: 'Energy',
    icon: (
      <Icon>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </Icon>
    ),
  },
  {
    label: 'Materials & Manufacturing',
    icon: (
      <Icon>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </Icon>
    ),
  },
  {
    label: 'Frontier Maker Space',
    icon: (
      <Icon>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </Icon>
    ),
  },
  {
    label: 'Arts & Music',
    icon: (
      <Icon>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </Icon>
    ),
  },
  {
    label: 'Biotech',
    icon: (
      <Icon>
        <path d="M14 2v6l3.09 7.81A2 2 0 0 1 15.23 18H8.77a2 2 0 0 1-1.86-2.19L10 8V2" />
        <path d="M6.09 12h11.82M7 2h10" />
      </Icon>
    ),
  },
  {
    label: 'SpaceTech',
    icon: (
      <Icon>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </Icon>
    ),
  },
  {
    label: 'Ethereum & Web3',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </Icon>
    ),
  },
  {
    label: 'Creative Media',
    icon: (
      <Icon>
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
        <path d="m6.2 5.3 3.1 3.9M12.4 3.4l3.1 3.9" />
        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </Icon>
    ),
  },
];

interface FooterProps {
  onApply: () => void;
}

function getUtmParams(): { utm_source: string; utm_medium: string; utm_campaign: string } {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  return {
    utm_source: params.get('utm_source') || 'frontiertower',
    utm_medium: params.get('utm_medium') || 'website',
    utm_campaign: params.get('utm_campaign') || 'footer',
  };
}

export function Footer({ onApply }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const url = (import.meta.env.VITE_NEWSLETTER_SUBSCRIBE_URL || `${baseUrl}/next/newsletter-subscribe`).replace(/\/$/, '');
    const utm = getUtmParams();
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), ...utm }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Subscribe failed (${res.status})`);
      }
      setStatus('success');
      setMessage("Thanks — you're on the list.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  return (
    <footer>
      <DashedDivider />

      <div className="pl-8 md:pl-12 pr-4 md:max-[1599px]:pr-16 min-[1600px]:pr-[14%] py-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 mb-8">
          {/* Left: mark + newsletter + socials */}
          <div className="space-y-7">
            <div>
              <img src="/horizontal-logo.png" alt="Frontier Tower" className="h-8 mb-6" />
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs text-secondary">Subscribe to stay in the loop.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-[360px]">
                <div className="flex flex-1 min-w-0 border border-ink rounded-l-full overflow-hidden bg-paper">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={status === 'loading'}
                    className="font-mono text-xs bg-transparent px-4 py-2.5 text-ink placeholder:text-secondary/60 focus:outline-none w-full min-w-0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="font-mono text-[10px] uppercase tracking-widest bg-ink text-paper px-5 py-2.5 rounded-r-full border border-ink border-l-0 shrink-0 hover:opacity-90 transition-opacity duration-200 disabled:opacity-60"
                >
                  {status === 'loading' ? '…' : 'Subscribe'}
                </button>
              </form>
              {message && (
                <p className={status === 'error' ? 'font-mono text-[9px] text-accent' : 'font-mono text-[9px] text-secondary/45'}>
                  {message}
                </p>
              )}
              <p className="font-mono text-[9px] text-secondary/45">
                · Unsubscribe anytime &nbsp;·&nbsp; Good updates only
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200 uppercase tracking-wider"
                >
                  {label}
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
              {/*
              <button
                type="button"
                onClick={onApply}
                className="block font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200 text-left"
              >
                Apply Now
              </button>
              */}
              <a
                href="https://frontiertower.io"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200"
              >
                frontiertower.io
              </a>
            </div>
            <div className="space-y-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50 mb-4">
                Legal
              </div>
              {legalLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-[10px] text-secondary hover:text-ink transition-colors duration-200"
                >
                  {label}
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
          className="flex items-center whitespace-nowrap"
          style={{ animation: 'ticker 40s linear infinite' }}
        >
          {[...communities, ...communities].map((c, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2.5 shrink-0 px-8 text-paper/50">
                {c.icon}
                <span className="font-mono text-[11px] uppercase tracking-widest">{c.label}</span>
              </span>
              <span className="text-paper/20 shrink-0">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
