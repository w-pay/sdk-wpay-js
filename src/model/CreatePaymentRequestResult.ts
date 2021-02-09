import { QRCode } from "./QRCode";

/**
 * The result from creating a new Payment Request.
 */
export interface CreatePaymentRequestResult {
	/** The ID of the new Payment Request */
	paymentRequestId: string;

	/** A {@link QRCode} that is associated to the Payment Request */
	qr?: QRCode;
}
