import { QRCodePaymentReferenceType } from "./QRCodePaymentReferenceType";

/**
 * Detail of a QR code
 */
export interface QRCode {
	/** The ID of the QR Code */
	qrId: string;

	/** The ID of the Payment Request linked to this QR code */
	referenceId: string;

	/** "The type of ID held in {@link QRCode.referenceId} */
	referenceType: QRCodePaymentReferenceType;

	/** The text content for the QR code. */
	content: string;

	/** Base64 encoded PNG of the QR Code */
	image: string;

	/**
	 * Timestamp indicating when the QR code will expire and become ineffective.
	 *
	 * If absent then the QR code will not expire until it is deleted
	 */
	expiryTime?: Date;
}
