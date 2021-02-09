import { Payment } from "./Payment";

/**
 * Summary information of a transaction
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

	/** The error detail returned by downstream processes when the payment is REJECTED */
	statusDetail?: any;

	/** The reason provided for the refund. Only provided for REFUND transactions */
	refundReason?: string;
}

/**
 * Allowed types of transactions
 */
export enum TransactionSummaryPaymentType {
	/** A payment by a customer to a merchant */
	PAYMENT = "PAYMENT",

	/** A payment by a merchant to a customer undoing a previously made customer payment */
	REFUND = "REFUND"
}

/**
 * Allowed states that a transaction can be in
 */
export enum TransactionSummaryPaymentStatus {
	/** The transaction is being processed */
	PROCESSING = "PROCESSING",

	/** The transaction was approved */
	APPROVED = "APPROVED",

	/** The transaction was rejected */
	REJECTED = "REJECTED"
}
