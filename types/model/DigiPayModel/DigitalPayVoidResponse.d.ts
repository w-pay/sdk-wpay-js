/**
 * The JSON success response structure of the Voids endpoint.
 *
 * @category Model
 */
export interface DigitalPayVoidResponse {
	/** Container reference in the transaction logs. This number uniquely identifies the whole/grouped transaction in the container. */
	transactionReceipt: string;

	/** A flag to indicate if a split void was only partially successful, ie. at least 1 of the voids had a successful result. */
	partialSuccess: boolean;

	/** List of void responses */
	voidResponses: DigitalPayVoidTransactionResponse[];
}

export interface DigitalPayVoidTransactionResponse {
	/** Container reference in the transaction logs. This number uniquely identifies the credit card transaction in the container. */
	paymentTransactionRef: string;

	/** Container reference in the transaction logs. This number uniquely identifies the void transaction in the container. */
	voidTransactionRef: string;

	/**
	 * The external service code (from eg. WebPay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceCode?: string;

	/**
	 * The external service message (from eg. WebPay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceMessage?: string;

	/** The error code. Only present if an error occurred during payment. */
	errorCode?: string;

	/** The error message. Only present if an error occurred during payment. */
	errorMessage?: string;

	/** The error detail. Only present if an error occurred during payment. */
	errorDetail?: string;
}
