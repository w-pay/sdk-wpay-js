import { DynamicPayload } from "./DynamicPayload";
import { QRCode } from "./QRCode";

/**
 * Request containing the details of the {@link PaymentSession}
 *
 * @category Model
 */
export interface CreatePaymentSessionRequest {
	/** The location of the payment session (used to group payment sessions). */
	location: string;

	/** Payload used to pass merchant information to the customer. */
	merchantInfo: DynamicPayload;

	/**
	 * Flag indicating whether a QR code should be created and returned in the response.
	 *
	 * @returns `false` by default
	 */
	generateQR: boolean;

	/**
	 * The time in seconds that the payment request should remain valid
	 *
	 * Default value is 0 which indicates that the code will not expire until it is deleted
	 *
	 * @returns: `0` by default
	 */
	timeToLivePaymentSession: number;

	/**
	 * The time in seconds that the QR code should remain valid.
	 *
	 * Default value is 0 which indicates that the code will not expire until it is deleted
	 *
	 * @returns `0` by default
	 */
	timeToLiveQR: number;
}

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
