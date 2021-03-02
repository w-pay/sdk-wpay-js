import { Basket } from "./Basket";
import { MerchantPayload } from "./MerchantPayload";
import { PosPayload } from "./PosPayload";
import { QRCode } from "./QRCode";
import { QRCodePaymentReferenceType } from "./QRCodePaymentReferenceType";

/**
 * The details of the payment to be created.
 *
 * @category Model
 */
export interface NewPaymentRequest {
	/** The unique reference for the payment */
	merchantReferenceId: string;

	/** The gross amount to be paid. Must be positive */
	grossAmount: number;

	/** Whether a {@link QRCode} should be created and returned in the response */
	generateQR?: boolean;

	/**
	 * The number of times that the payment request can be used to create a payment.
	 *
	 * If absent, the API will default value to 1.
	 *
	 * If set to 0 then the request can be used an unlimited number of times.
	 */
	maxUses?: number;

	/**
	 * The time in seconds that the payment request should remain valid.
	 *
	 * After this time any use of the request to create a payment will fail.
	 *
	 * If absent, the API will default value to 0 which indicates that the payment request will not expire until it is deleted
	 */
	timeToLivePayment?: number;

	/**
	 * The time in seconds that the QR code should remain valid.
	 *
	 * After this time any use of the request to create a payment will fail.
	 *
	 * If absent, the API will default value to 0 which indicates that the code will not expire until it is deleted
	 */
	timeToLiveQR?: number;

	/**
	 * The ID of a specific wallet for which the payment is intended.
	 *
	 * Can be used in scenarios where a customer has previously requested that their wallet ID is retained for repeat purchase.
	 *
	 * If supplied the payment can only be used by the intended wallet.
	 *
	 * If absent then any wallet can create a payment against the Payment Request
	 */
	specificWalletId?: string;

	/** The {@link Basket} associated to the transaction. */
	basket?: Basket;

	/** Optional extra details from the POS. */
	posPayload?: PosPayload;

	/** Optional extra details from the merchant. */
	merchantPayload?: MerchantPayload;
}

/**
 * The result from creating a new Payment Request.
 *
 * @category Model
 */
export interface CreatePaymentRequestResult {
	/** The ID of the new Payment Request */
	paymentRequestId: string;

	/** A {@link QRCode} that is associated to the Payment Request */
	qr?: QRCode;
}

/**
 * Request to create a new {@link QRCode} for a Payment Request
 *
 * @category Model
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
	timeToLive?: number;
}
