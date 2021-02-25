import { OpenPayExtendedTransactionData } from "./OpenPayPaymentResponse";

/**
 * The JSON response structure of the OpenPay Completions endpoint.
 *
 * @category Model
 */
export interface OpenPayCompletionResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the whole/grouped transaction in the container.
	 */
	transactionReceipt: string;

	/** List of completion responses */
	completionResponses: OpenPayTransactionCompletionResponse[];
}

export interface OpenPayTransactionCompletionResponse {
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

	/** This array is only included in the response if it is enabled in the consumers API configuration. */
	extendedTransactionData?: OpenPayExtendedTransactionData;
}
