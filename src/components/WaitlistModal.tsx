import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { UserFormData, PaymentResponse, ModalStep } from '../types';
import { cn } from '../utils/cn';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripeKey);

const FLOORS = [
  'Artificial Intelligence',
  'Neuroscience & BCI',
  'Frontier Maker Space',
  'Arts & Music',
  'Biotech',
  'Hard Tech & Robotics',
  'Human Flourishing',
  'Longevity & Health',
  'Ethereum House',
  'Frontier Fitness',
];

const inputClass =
  'w-full border border-secondary/30 bg-transparent px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:border-ink transition-colors';
const labelClass =
  'block font-mono text-[10px] uppercase tracking-[0.18em] text-secondary mb-1.5';

const CROSSHATCH = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='16' y1='12' x2='16' y2='20' stroke='%236478a0' stroke-width='1' stroke-opacity='0.1'/%3E%3Cline x1='12' y1='16' x2='20' y2='16' stroke='%236478a0' stroke-width='1' stroke-opacity='0.1'/%3E%3C/svg%3E")`;

function StepIndicator({ current, title }: { current: number; title: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
          Step {String(current).padStart(2, '0')} / 03 — {title}
        </span>
      </div>
      <div className="w-full h-px bg-secondary/20 relative">
        <div
          className="absolute left-0 top-0 h-px bg-accent transition-all duration-500"
          style={{ width: `${(current / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: UserFormData;
  onChange: (updates: Partial<UserFormData>) => void;
  onNext: () => void;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <StepIndicator current={1} title="Personal Information" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            required
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            required
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input
          type="email"
          required
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          type="tel"
          required
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Twitter / LinkedIn / Instagram{' '}
          <span className="normal-case opacity-60">(optional)</span>
        </label>
        <input
          type="text"
          value={data.socialHandle || ''}
          onChange={(e) => onChange({ socialHandle: e.target.value })}
          className={inputClass}
          placeholder="@handle or profile URL"
        />
      </div>

      <div>
        <label className={labelClass}>What are you currently working on?</label>
        <textarea
          required
          value={data.whatAreYouWorkingOn}
          onChange={(e) => onChange({ whatAreYouWorkingOn: e.target.value })}
          rows={2}
          className={cn(inputClass, 'resize-none')}
          placeholder="Tell us about your current projects, ideas, or ventures…"
        />
      </div>

      <div className="pt-1 flex justify-end">
        <button
          type="submit"
          className="font-mono text-[11px] tracking-[0.2em] uppercase border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper transition-all duration-200"
        >
          Continue →
        </button>
      </div>
    </form>
  );
}

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: UserFormData;
  onChange: (updates: Partial<UserFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (data.floor) onNext(); }}
      className="space-y-4"
    >
      <StepIndicator current={2} title="Community" />

      <div>
        <label className={labelClass}>Which floor would you call home?</label>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {FLOORS.map((floor) => (
            <button
              key={floor}
              type="button"
              onClick={() => onChange({ floor })}
              className={cn(
                'border px-3 py-2.5 font-mono text-[11px] cursor-pointer transition-all text-left',
                data.floor === floor
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-secondary/20 text-ink hover:border-secondary/50'
              )}
            >
              {floor}
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] text-secondary/60 mt-1.5">
          20% of your membership fee supports your chosen floor's development.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>
            Organization <span className="normal-case opacity-60">(optional)</span>
          </label>
          <input
            type="text"
            value={data.organization || ''}
            onChange={(e) => onChange({ organization: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Role <span className="normal-case opacity-60">(optional)</span>
          </label>
          <input
            type="text"
            value={data.role || ''}
            onChange={(e) => onChange({ role: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary hover:text-ink transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!data.floor}
          className={cn(
            'font-mono text-[11px] tracking-[0.2em] uppercase border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper transition-all duration-200',
            !data.floor && 'opacity-40 cursor-not-allowed'
          )}
        >
          Continue →
        </button>
      </div>
    </form>
  );
}

function Step3({
  data,
  onChange,
  onSubmit,
  onBack,
}: {
  data: UserFormData;
  onChange: (updates: Partial<UserFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <StepIndicator current={3} title="About You" />

      <div>
        <label className={labelClass}>How did you hear about us?</label>
        <input
          type="text"
          required
          value={data.howDidYouHear || ''}
          onChange={(e) => onChange({ howDidYouHear: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Brag about yourself in one sentence</label>
        <textarea
          required
          value={data.whatIsYourExpertise}
          onChange={(e) => onChange({ whatIsYourExpertise: e.target.value })}
          rows={2}
          className={cn(inputClass, 'resize-none')}
          placeholder="e.g. I was the founding engineer of Midjourney"
        />
      </div>

      <div>
        <label className={labelClass}>
          How would you use and contribute to the Vertical Village?
        </label>
        <textarea
          required
          value={data.contribution || ''}
          onChange={(e) => onChange({ contribution: e.target.value })}
          rows={2}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <div className="pt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary hover:text-ink transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="font-mono text-[11px] tracking-[0.2em] uppercase border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper transition-all duration-200"
        >
          Proceed to Deposit →
        </button>
      </div>
    </form>
  );
}

function Submitting() {
  return (
    <div className="flex flex-col items-center py-12 space-y-5">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
        Reviewing your application…
      </p>
    </div>
  );
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '14px',
      color: '#1C1C1E',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#dc2626' },
  },
};

function PaymentStep({
  clientSecret,
  billingDetails,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  billingDetails: { name: string; email: string; phone: string };
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) { onError('Card form not ready'); return; }

    setIsProcessing(true);
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: billingDetails.name,
          email: billingDetails.email,
          phone: billingDetails.phone,
        },
      },
    });

    if (error) {
      onError(error.message || 'Payment failed');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-secondary/20 pb-5">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary mb-2">
          Finalise Your Application
        </div>
        <h2
          className="font-serif text-ink leading-tight mb-2"
          style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            fontVariationSettings: '"SOFT" 100, "WONK" 0',
          }}
        >
          Secure Your Place
        </h2>
        <p className="font-mono text-sm text-secondary leading-relaxed">
          Complete your application with a{' '}
          <span className="text-ink">£140 deposit</span> — your first month's membership.
        </p>
      </div>

      <div className="space-y-1 font-mono text-xs">
        <div className="flex justify-between text-secondary">
          <span>Name</span>
          <span className="text-ink">{billingDetails.name}</span>
        </div>
        <div className="flex justify-between text-secondary">
          <span>Email</span>
          <span className="text-ink">{billingDetails.email}</span>
        </div>
        <div className="flex justify-between text-secondary">
          <span>Phone</span>
          <span className="text-ink">{billingDetails.phone}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Card Details</label>
          <div className="border border-secondary/30 px-4 py-3 bg-transparent">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={cn(
            'w-full font-mono text-[11px] tracking-[0.2em] uppercase border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper transition-all duration-200',
            (!stripe || isProcessing) && 'opacity-40 cursor-not-allowed'
          )}
        >
          {isProcessing ? 'Confirming…' : 'Submit Application →'}
        </button>

        <div className="flex items-start gap-3 font-mono text-[10px] text-secondary/70">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Your waitlist place is risk-free. If not approved, you'll get a full refund.
        </div>
      </form>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="py-10 text-center space-y-6">
      <div className="w-12 h-12 border border-accent flex items-center justify-center mx-auto">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Application Received
        </div>
        <h2
          className="font-serif text-ink"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontVariationSettings: '"SOFT" 100, "WONK" 0',
          }}
        >
          Welcome to the Future
        </h2>
        <p className="font-mono text-sm text-secondary leading-relaxed max-w-sm mx-auto">
          You're now on the Frontier Tower waitlist. We'll be in touch soon with next steps
          and exclusive updates.
        </p>
        <p className="font-mono text-[10px] text-secondary/60">
          Check your email for confirmation and further details.
        </p>
      </div>
    </div>
  );
}

interface WaitlistModalProps {
  onClose: () => void;
}

export function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<ModalStep>('step1');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    whatAreYouWorkingOn: '',
    whatIsYourExpertise: '',
  });

  const updateForm = (updates: Partial<UserFormData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const submitApplication = async () => {
    setStep('submitting');
    setError(null);
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const url = `${baseUrl}/next/pre-signup-requests/`;
      const body = { ...formData, location: 2, subscriptionInterval: 'monthly' };
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('[Waitlist] Error response:', errorBody);
        throw new Error('Failed to submit application');
      }
      const data: PaymentResponse = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep('payment');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStep('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-screen overflow-hidden relative flex flex-col justify-center"
      style={{ backgroundImage: CROSSHATCH, backgroundSize: '32px 32px' }}
    >
      {/* Content layer */}
      <div className="relative z-10 flex flex-col px-4 pt-8 pb-6">
        {/* Centered wrapper — offset left on desktop to center on full viewport */}
        <div className="w-full max-w-xl mx-auto flex flex-col min-h-0 flex-1 md:[transform:translateX(-10vw)]">

          {/* Header */}
          <div className="flex items-center justify-between mb-5 px-0.5 shrink-0">
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-secondary">
              Frontier Tower · Application
            </div>
            <button
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary hover:text-ink transition-colors"
            >
              ← Back to site
            </button>
          </div>

          {/* White card — fills remaining height, scrolls internally */}
          <div className="bg-white border border-ink shadow-[6px_8px_0px_#1a1814] overflow-y-auto flex-1 min-h-0">
            <div className="p-6 md:p-9">
              <AnimatePresence mode="wait">
                {step === 'step1' && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Step1 data={formData} onChange={updateForm} onNext={() => setStep('step2')} />
                  </motion.div>
                )}

                {step === 'step2' && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Step2
                      data={formData}
                      onChange={updateForm}
                      onNext={() => setStep('step3')}
                      onBack={() => setStep('step1')}
                    />
                  </motion.div>
                )}

                {step === 'step3' && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Step3
                      data={formData}
                      onChange={updateForm}
                      onSubmit={submitApplication}
                      onBack={() => setStep('step2')}
                    />
                  </motion.div>
                )}

                {step === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Submitting />
                  </motion.div>
                )}

                {step === 'payment' && clientSecret && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Elements stripe={stripePromise}>
                      <PaymentStep
                        clientSecret={clientSecret}
                        billingDetails={{
                          name: `${formData.firstName} ${formData.lastName}`.trim(),
                          email: formData.email,
                          phone: formData.phone,
                        }}
                        onSuccess={() => setStep('success')}
                        onError={(err) => { setError(err); setStep('error'); }}
                      />
                    </Elements>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SuccessScreen />
                  </motion.div>
                )}

                {step === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="w-12 h-12 border border-red-400/50 flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="space-y-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500">Error</div>
                      <p className="font-mono text-sm text-secondary">{error}</p>
                      <button
                        onClick={() => setStep('payment')}
                        className="font-mono text-[11px] tracking-[0.2em] uppercase border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper transition-all duration-200"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
