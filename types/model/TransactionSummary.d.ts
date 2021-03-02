import { Payment } from "./Payment";

/**
 * Summary information of a transaction
 *
 * @category Model
 */
export interface TransactionSummary extends Payment {
	/** The ID of the transaction */
	transactionId: string;

	/** An optional client reference associated with the transaction. */
	clientReference?: string;

	/** The type of transaction. */
	type: TransactionSummaryPaymentType;

	/** Timestamp of when the transaction occurred */
	executionTime: Date;

	/** The current status of the transactions */
	status: TransactionSummaryPaymentStatus;

	/** The rollback state of this transaction */
	rollback?: TransactionSummaryRollback;

	/** Array of transaction responses returned by downstream processes */
	subTransactions?: any[];

	/** The reason provided for the refund. Only provided for REFUND transactions */
	refundReason?: string;

	/** The instruments used to make the payment. For refunds and cash back amounts will be negative */
	instruments: TransactionUsedPaymentInstrument[];
}

/**
 * Allowed types of transactions
 *
 * @category Model
 */
export enum TransactionSummaryPaymentType {
	/** A payment by a customer to a merchant */
	PAYMENT = "PAYMENT",

	/** A payment by a merchant to a customer undoing a previously made customer payment */
	REFUND = "REFUND"
}

/**
 * Allowed states that a transaction can be in
 *
 * @category Model
 */
export enum TransactionSummaryPaymentStatus {
	/** The transaction is being processed */
	PROCESSING = "PROCESSING",

	/** The transaction was approved */
	APPROVED = "APPROVED",

	/** The transaction was rejected */
	REJECTED = "REJECTED"
}

export enum TransactionSummaryRollback {
	REQUIRED = "REQUIRED",
	NOT_REQUIRED = "NOT_REQUIRED",
	FAILED = "FAILED",
	SUCCESSFUL = "SUCCESSFUL"
}

/**
 * An instrument used for a transaction
 *
 * @category Model
 */
export interface TransactionUsedPaymentInstrument {
	/** The ID of the {@link PaymentInstrument} */
	paymentInstrumentId: string;

	/** The type of the payment instrument */
	instrumentType: string;

	/** The list of transactions associated with the instrument." */
	transactions: UsedPaymentInstrumentTransaction[];
}

/**
 * A subtransaction associated with a payment instrument
 *
 * @category Model
 */
export interface UsedPaymentInstrumentTransaction {
	/** The type of transaction. */
	type?: TransactionSummaryPaymentType;

	/** Timestamp of when the transaction occurred */
	executionTime?: Date;

	/** The reference for the payment */
	paymentTransactionRef?: string;

	/** The current status of the transactions */
	status?: TransactionSummaryPaymentStatus;

	/** The amount charged against or refunded to this instrument */
	amount?: number;
}
