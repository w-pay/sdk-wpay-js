import { DynamicPayload } from "./DynamicPayload";

/**
 * A session between a customer and a merchant
 */
export interface PaymentSession {
	/** The ID of the {@link PaymentSession} */
	paymentSessionId: string;

	/** The ID of the associated Payment Request */
	paymentRequestId?: string;

	/** The ID of the merchant initiating the {@link PaymentSession} */
	merchantId: string;

	/** The ID of the customers wallet */
	walletId?: string;

	/** The timestamp of when the payment session will expire and become unusable */
	expiryTime: Date;

	/** The location of the {@link PaymentSession} (used to group payment sessions) */
	location: string;

	/** Payload used to pass merchant information to the customer */
	merchantInfo: DynamicPayload;

	/** Payload used to pass customer information back to the merchant */
	customerInfo?: DynamicPayload;
}
