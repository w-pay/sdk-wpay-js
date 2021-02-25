/**
 * The JSON response structure of the Completions endpoint.
 *
 * @category Model
 */
export interface DigitalPayCompletionResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the whole/grouped transaction in the container.
	 */
	transactionReceipt: string;

	/**
	 * A flag to indicate if a split completion was only partially successful,
	 *
	 * ie. at least 1 of the completions had a successful result.
	 */
	partialSuccess: boolean;

	completionResponses: DigitalPayTransactionCompletionResponse[];
}

export interface DigitalPayTransactionCompletionResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the credit card transaction in the container.
	 */
	paymentTransactionRef: string;

	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the completion transaction in the container.
	 */
	completionTransactionRef: string;

	/** The amount processed in the completion. */
	amount: number;

	/** The error code. Only present if an error occurred during payment. */
	errorCode: string;

	/** The error message. Only present if an error occurred during payment. */
	errorMessage: string;

	/** The error detail. Only present if an error occurred during payment. */
	errorDetail: string;

	/**
	 * The external service code (from eg. Webpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceCode: string;

	/**
	 * The external service message (from eg. Webpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceMessage: string;
}
