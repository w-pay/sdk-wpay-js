import { Basket } from "./Basket";
import { MerchantPayload } from "./MerchantPayload";
import { Payment } from "./Payment";
import { PosPayload } from "./PosPayload";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MerchantPayments {}

/**
 * List of payments made involving a merchant.
 *
 * @category Model
 */
export interface MerchantPaymentSummaries extends MerchantPayments {
	/** The resulting list of payments. */
	payments: MerchantPaymentSummary[];
}

/**
 * Summary information for a single Payment Request
 *
 * @category Model
 */
export interface MerchantPaymentSummary extends Payment {
	/**
	 * The number of times that the payment request can be used to create a payment.
	 *
	 * If absent then request can be used an unlimited number of times.
	 */
	usesRemaining?: number;

	/**
	 * The Timestamp for when the payment request will expire and become unusable for payments.
	 *
	 * If absent then the payment request will not expire until it is deleted
	 */
	expiryTime?: Date;

	/**
	 * The ID of a specific wallet for which the payment is intended.
	 *
	 * If present then the payment can only be used by the intended wallet.
	 * If absent then any wallet can create a payment against the Payment Request.
	 */
	specificWalletId?: string;
}

/**
 * Detailed information for a single Payment Request
 *
 * @category Model
 */
export interface MerchantPaymentDetails extends MerchantPaymentSummary {
	/** The {@link Basket} associated to the transaction. */
	basket?: Basket;

	/** Optional extra details from the POS. */
	posPayload?: PosPayload;

	/** Optional extra details from the merchant. */
	merchantPayload?: MerchantPayload;
}
