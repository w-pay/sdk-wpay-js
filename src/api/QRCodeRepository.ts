import { NewPaymentRequestQRCode } from "../model";
import { QRCode } from "../model";

export interface QRCodeRepository {
	/**
	 * Create a new QR code for an existing payment request
	 *
	 * @param details The details for the new QR code.
	 */
	createPaymentRequestQRCode(details: NewPaymentRequestQRCode): Promise<QRCode>;

	/**
	 * Retrieve a {@link QRCode} that is associated to a Payment Request by its ID
	 *
	 * @param qrCodeId The ID to use.
	 */
	getPaymentRequestQRCodeContent(qrCodeId: string): Promise<QRCode>;

	/**
	 * Cancels a QR code making it unusable
	 *
	 * @param qrCodeId The ID of the QR code to cancel.
	 */
	cancelPaymentQRCode(qrCodeId: string): Promise<void>;
}
