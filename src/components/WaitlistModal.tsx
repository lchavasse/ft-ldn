import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { UserFormData, PaymentResponse, ModalStep } from '../types';
import { cn } from '../utils/cn';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
console.log('[Stripe] Publishable key:', stripeKey.substring(0, 12) + '...');
const stripePromise = loadStripe(stripeKey);

interface UserDetailFormProps {
  onSubmit: (data: UserFormData) => void;
  loading: boolean;
}

const UserDetailForm = ({ onSubmit, loading }: UserDetailFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    email: 'test@example.com',
    phone: '+447700900000',
    firstName: 'Test',
    lastName: 'User',
    whatAreYouWorkingOn: 'Building the future of urban living',
    whatIsYourExpertise: 'Software engineering and design',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-serif text-ink">Join the Future</h3>
        <p className="text-gray-600">Tell us about yourself to secure your place in Frontier Tower.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What are you working on?</label>
        <textarea
          required
          value={formData.whatAreYouWorkingOn}
          onChange={(e) => setFormData(prev => ({ ...prev, whatAreYouWorkingOn: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
          placeholder="Tell us about your current projects, ideas, or ventures..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What is your expertise?</label>
        <textarea
          required
          value={formData.whatIsYourExpertise}
          onChange={(e) => setFormData(prev => ({ ...prev, whatIsYourExpertise: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
          placeholder="Share your skills, experience, and areas of expertise..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full py-4 px-6 bg-accent hover:bg-accent/90 text-white font-medium rounded-sm transition-all duration-200",
          loading && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </button>
    </motion.form>
  );
};

interface PaymentFormProps {
  clientSecret: string;
  billingDetails: { name: string; email: string };
  onSuccess: () => void;
  onError: (error: string) => void;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1a1a1a',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: {
      color: '#dc2626',
    },
  },
};

const PaymentForm = ({ clientSecret, billingDetails, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Card form not ready');
      return;
    }

    setIsProcessing(true);
    console.log('[Payment] Confirming with confirmCardPayment...');

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: billingDetails.name,
          email: billingDetails.email,
        },
      },
    });

    if (error) {
      console.error('[Payment] Error:', error);
      onError(error.message || 'Payment failed');
      setIsProcessing(false);
    } else {
      console.log('[Payment] Success');
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-serif text-ink">Secure Your Spot</h3>
        <p className="text-gray-600">
          Complete your application with a monthly subscription to join our exclusive community.
        </p>
        <div className="bg-gray-50 p-4 rounded-sm">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Monthly Subscription:</span> £299/month
            <br />
            <span className="text-xs">Cancel anytime. Founding members get special rates.</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border border-gray-300 rounded-sm bg-white">
          <CardElement options={cardElementOptions} />
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={cn(
            "w-full py-4 px-6 bg-accent hover:bg-accent/90 text-white font-medium rounded-sm transition-all duration-200",
            (!stripe || isProcessing) && "opacity-50 cursor-not-allowed"
          )}
        >
          {isProcessing ? 'Confirming Payment...' : 'Join Frontier Tower'}
        </button>
      </form>
    </motion.div>
  );
};

const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="text-center space-y-6 py-8"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
    >
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>

    <div className="space-y-4">
      <h3 className="text-2xl font-serif text-ink">Welcome to the Future</h3>
      <p className="text-gray-600">
        You're now on the Frontier Tower waitlist. We'll be in touch soon with next steps
        and exclusive updates about our progress.
      </p>
      <p className="text-sm text-gray-500">
        Check your email for confirmation and further details.
      </p>
    </div>
  </motion.div>
);

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<ModalStep>('FORM');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [submittedFormData, setSubmittedFormData] = useState<UserFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: UserFormData) => {
    setStep('SUBMITTING');
    setError(null);

    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const url = `${baseUrl}/next/pre-signup-requests/`;
      const body = {
        ...formData,
        location: 2,
        subscriptionInterval: 'monthly',
      };
      console.log('[Waitlist] POST', url);
      console.log('[Waitlist] Request body:', body);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('[Waitlist] Response status:', response.status);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('[Waitlist] Error response:', errorBody);
        throw new Error('Failed to submit application');
      }

      const data: PaymentResponse = await response.json();
      console.log('[Waitlist] Response data:', data);

      if (data.clientSecret) {
        console.log('[Waitlist] clientSecret prefix:', data.clientSecret.substring(0, 12) + '...');
        setClientSecret(data.clientSecret);
        setSubmittedFormData(formData);
        setStep('PAYMENT');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('[Waitlist] Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStep('ERROR');
    }
  };

  const handlePaymentSuccess = () => {
    setStep('SUCCESS');
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setStep('ERROR');
  };

  const handleRetry = () => {
    setError(null);
    setStep('PAYMENT');
  };

  const handleClose = () => {
    setStep('FORM');
    setClientSecret(null);
    setSubmittedFormData(null);
    setError(null);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl max-h-[calc(100vh-2rem)] transform overflow-y-auto rounded-sm bg-white p-8 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {step === 'FORM' && (
                  <UserDetailForm
                    onSubmit={handleFormSubmit}
                    loading={false}
                  />
                )}

                {step === 'SUBMITTING' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing your application...</p>
                  </motion.div>
                )}

                {step === 'PAYMENT' && clientSecret && submittedFormData && (
                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      clientSecret={clientSecret}
                      billingDetails={{
                        name: `${submittedFormData.firstName} ${submittedFormData.lastName}`.trim(),
                        email: submittedFormData.email,
                      }}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                )}

                {step === 'SUCCESS' && <SuccessMessage />}

                {step === 'ERROR' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-red-600">Payment Failed</h3>
                      <p className="text-gray-600">{error}</p>
                      <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}