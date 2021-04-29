import { TransactionType } from "./TransactionType";

/**
 * Data required to charge against a {@link PaymentAgreement}
 *
 * @category Model
 */
export interface ChargePaymentAgreementRequest {
	/**
	 * The payment token of the payment agreement.
	 *
	 * The payment token is a unique identifier for the payment agreement.
	 */
	paymentToken: string;

	/** The amount that will be charged against the payment instrument linked to the payment agreement. */
	amount: number;

	/** A merchant application specific reference number for the transaction. */
	clientReference: string;

	/** A merchant order number for the transaction. */
	orderNumber: string;

	/** Transaction type containers to use for all instruments. */
	transactionType: TransactionType;

	/** A merchant application specific reference number for the customer. */
	customerRef?: string;
}
