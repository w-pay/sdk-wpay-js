/**
 * Properties common to all Payments and Payment Requests
 */
export interface Payment {
	/** The ID of this payment request */
	paymentRequestId: string;

	/** The unique reference for the payment as defined by the Merchant */
	merchantReferenceId: string;

	/** The gross amount to be paid. Must be positive except for refunds */
	grossAmount: number;
}
