import { cn } from '../utils/cn';

export const AxisCross = ({ className }: { className?: string }) => (
  <svg className={cn('w-6 h-6 text-secondary/40 pointer-events-none', className)} viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="0.75" />
    <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

export const RegistrationMark = ({ className }: { className?: string }) => (
  <svg className={cn('w-5 h-5 text-accent pointer-events-none', className)} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" />
    <line x1="10" y1="0" x2="10" y2="6" stroke="currentColor" strokeWidth="1" />
    <line x1="10" y1="14" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="1" />
    <line x1="14" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const TapeStrip = ({ className }: { className?: string }) => (
  <div className={cn('w-20 h-5 bg-amber-200/40', className)} />
);

export const DashedDivider = ({ className }: { className?: string }) => (
  <div className={cn('border-t border-dashed border-secondary/25', className)} />
);

export const SectionLabel = ({ number, title }: { number: string; title: string }) => (
  <div className="font-mono text-[10px] text-secondary tracking-[0.25em] uppercase mb-8">
    {number} — {title}
  </div>
);
