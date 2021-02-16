import { QRCode } from "./QRCode";

/**
 * The result of creating a {@link PaymentSession}
 *
 * @category Model
 */
export interface CreatePaymentSessionResult {
	/** The ID of the new {@link PaymentSession} */
	paymentSessionId: string;

	/** A {@link QRCode} that is associated to the {@link PaymentSession} */
	qr?: QRCode;
}
