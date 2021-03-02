/**
 * The JSON request structure of the Completions endpoint.
 *
 * @category Model
 */
export interface DigitalPayCompletionRequest {
	/**
	 * A merchant application specific reference number.
	 *
	 * This number should uniquely identify the transaction in the merchant’s system.
	 */
	clientReference: string;

	/** The merchant order number of the transaction. */
	orderNumber: string;

	/** List of completions */
	completions: DigitalPayCompletion[];
}

export interface DigitalPayCompletion {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the credit card transaction in the container.
	 */
	paymentTransactionRef: string;

	/** The amount you want to process in the completion. */
	amount: number;
}
