export interface UserFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  whatAreYouWorkingOn: string;
  whatIsYourExpertise: string;
  socialHandle?: string;
  floor?: string;
  organization?: string;
  role?: string;
  howDidYouHear?: string;
  contribution?: string;
}

export interface PaymentResponse {
  subscriptionUuid: string;
  clientSecret: string;
}

export type ModalStep = 'step1' | 'step2' | 'step3' | 'submitting' | 'payment' | 'success' | 'error';
