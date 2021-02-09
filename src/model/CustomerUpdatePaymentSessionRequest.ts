import { DynamicPayload } from "./DynamicPayload";

/**
 * Request to update the customer messages to the merchant in the {@link PaymentSession}
 */
export interface CustomerUpdatePaymentSessionRequest {
	/** Payload used to pass customer information back to the merchant */
	customerInfo: DynamicPayload;
}
