/**
 * The JSON request structure of the OpenPay Completions endpoint.
 *
 * @category Model
 */
export interface OpenPayCompletionRequest {
	/**
	 * A merchant application specific reference number.
	 *
	 * This number should uniquely identify the transaction in the merchant’s system.
	 */
	clientReference: string;

	/** The merchant order number of the transaction. */
	orderNumber: string;

	/** The merchants transaction date and time. The timestamp format is ISO8601. */
	merchantTransactedAt: string;

	/** List of completions */
	completions: OpenPayCompletion[];
}

export interface OpenPayCompletion {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the credit card transaction in the container.
	 */
	paymentTransactionRef: string;

	/** The amount you want to process in the completion. */
	amount: number;

	/** The GST amount of the amount you want to process in the completion. */
	gstAmount?: number;
}
