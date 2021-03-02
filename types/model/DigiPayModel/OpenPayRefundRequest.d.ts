/**
 * The JSON request structure of the Openpay Refunds endpoint.
 *
 * @category Model
 */
export interface OpenPayRefundRequest {
	/**
	 * A merchant application specific reference number.
	 *
	 * This number should uniquely identify the transaction in the merchant’s system.
	 */
	clientReference: string;

	/** The merchant order number of the transaction. */
	orderNumber?: string;

	/** The merchants transaction date and time. The timestamp format is ISO8601. */
	merchantTransactedAt?: string;

	/** List of refunds */
	refunds: OpenPayRefund[];

	storeData?: {
		/** The refund transaction store id. */
		storeId: string;
	};
}

export interface OpenPayRefund {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the payment transaction in the container.
	 */
	paymentTransactionRef: string;

	/** The amount you want to refund. */
	amount: number;

	/** The GST amount of the amount you want to refund. */
	gstAmount?: number;

	/** The reason or justification for the refund. */
	reason?: string;
}
