export interface Subscription {
  email: string;
  confirmationToken: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  unsubscribeToken: string;
  gdprConsent: boolean;
}

export interface SubscriptionRequest {
  email: string;
  gdprConsent: boolean;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
}
