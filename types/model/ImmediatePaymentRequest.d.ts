import { MerchantPayload } from "./MerchantPayload";
import { PaymentTransactionType } from "./PaymentTransactionType";
import { PosPayload } from "./PosPayload";

/**
 * Detailed information for a payment being made.
 *
 * @category Model
 */
export interface ImmediatePaymentRequest {
	/** A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system. */
	clientReference: string;

	/** The merchant order number of the transaction. */
	orderNumber: string;

	/** An optional flag allowing the consumer to indicate that automatic rollback step should be skipped in the case of failure */
	skipRollback?: boolean;

	/** An optional flag allowing the consumer to indicate that a partial success will not trigger a failure and rollback */
	allowPartialSuccess?: boolean;

	/** List of payment to be made as part of this transaction  */
	payments: ImmediatePaymentItem[];

	/** Payload describing the specific POS system.  This payload originates in the payment request and is carried with any resulting transactions.  Provided in a generic schema previous configured by the merchant */
	posPayload?: PosPayload;

	/** Payload provided by the merchant to support other types of messaging.  This payload originates in the payment request and is carried with any resulting transactions.  Provided in a generic schema previous configured by the merchant */
	merchantPayload?: MerchantPayload;

	/** The transaction types to use for each instrument type. */
	transactionType?: PaymentTransactionType;
}

export interface ImmediatePaymentItem {
	/** The payment instrument id from the card capture iframe response or the list payment instruments response. */
	paymentInstrumentId: string;

	/** The amount you want to pay with the payment instrument. */
	amount: number;
}
