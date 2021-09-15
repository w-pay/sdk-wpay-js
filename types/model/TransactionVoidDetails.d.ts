/**
 * Request payload containing the void instructions
 *
 * @category Model
 */
export interface TransactionVoidDetails {
	/** An order number to be associated with the transaction. */
	orderNumber: string;

	/** A client reference to be associated with the transaction. */
	clientReference: string;

	/**
	 * List of voids. Can be used to execute a void on multiple payment instruments.
	 *
	 * If voids is not supplied any pre-authorised sub transactions will be voided
	 */
	voids?: VoidItem[];
}

/**
 * Payment reference of the pre-authorised transaction to be voided.
 *
 * @category Model
 */
export interface VoidItem {
	/** The payment reference for this transaction */
	paymentTransactionRef: string;
}
