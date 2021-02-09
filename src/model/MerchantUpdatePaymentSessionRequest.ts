import { DynamicPayload } from "./DynamicPayload";

/**
 * Request to update a {@link PaymentSession} for a merchant.
 */
export interface MerchantUpdatePaymentSessionRequest {
	/** Payload used to pass merchant information to the customer */
	merchantInfo: DynamicPayload;

	/** The ID of the associated Payment Request */
	paymentRequestId?: string;
}
