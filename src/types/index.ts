export interface UserFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  whatAreYouWorkingOn: string;
  whatIsYourExpertise: string;
}

export interface PaymentResponse {
  subscriptionUuid: string;
  clientSecret: string;
}

export type ModalStep = 'FORM' | 'SUBMITTING' | 'PAYMENT' | 'CONFIRMING' | 'SUCCESS' | 'ERROR';