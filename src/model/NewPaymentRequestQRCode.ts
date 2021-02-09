import { QRCodePaymentReferenceType } from "./QRCodePaymentReferenceType";

/**
 * Request to create a new {@link QRCode} for a Payment Request
 */
export interface NewPaymentRequestQRCode {
	/** The ID of the payment request linked to this {@link QRCode} */
	referenceId: string;

	/** The type of ID held in {@link NewPaymentRequestQRCode.referenceId} */
	referenceType: QRCodePaymentReferenceType;

	/**
	 * The time in seconds that the QR code should remain valid.
	 *
	 * After this time any use of the QR code by a customer will fail to return any data.
	 *
	 * If absent, the API will default value to 0 which indicates that the code will not expire until it is deleted.
	 */
	timeToLive: number;
}
