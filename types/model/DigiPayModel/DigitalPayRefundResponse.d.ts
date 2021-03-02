/**
 * The JSON success response structure of the Refunds endpoint.
 *
 * @category Model
 */
export interface DigitalPayRefundResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the whole/grouped transaction in the container.
	 */
	transactionReceipt: string;

	/** A flag to indicate if a split refund was only partially successful, ie. at least 1 of the refunds had a successful result. */
	partialSuccess: boolean;

	/** List of refund response */
	refundResponses: DigitalPayRefundTransactionResponse;
}

export interface DigitalPayRefundTransactionResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the credit card transaction in the container.
	 */
	paymentTransactionRef: string;

	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the refund transaction in the container.
	 */
	refundTransactionRef: string;

	/** The amount processed in the refund. */
	amount: number;

	/** The error code. Only present if an error occurred during payment. */
	errorCode?: string;

	/** The error message. Only present if an error occurred during payment. */
	errorMessage?: string;

	/** The error detail. Only present if an error occurred during payment. */
	errorDetail?: string;

	/**
	 * The external service code (from eg. Webpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceCode?: string;

	/**
	 * The external service message (from eg. Webpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceMessage: string;
}
