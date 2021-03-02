/**
 * The JSON request structure of the Refunds endpoint.
 *
 * @category Model
 */
export interface DigitalPayRefundRequest {
	/**
	 * A merchant application specific reference number.
	 *
	 * This number should uniquely identify the transaction in the merchant’s system.
	 */
	clientReference: string;

	/** The merchant order number of the transaction. */
	orderNumber: string;

	/** List of refunds */
	refunds: DigitalPayRefund[];
}

export interface DigitalPayRefund {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the payment transaction in the container.
	 */
	paymentTransactionRef: string;

	/** The amount you want to refund. */
	amount: number;
}
