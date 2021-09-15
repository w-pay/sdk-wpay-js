/**
 * Request payload containing the completion instructions
 *
 * @category Model
 */
export interface TransactionCompletionDetails {
	/** An order number to be associated with the transaction. */
	orderNumber: string;

	/** A client reference to be associated with the transaction. */
	clientReference: string;

	/**
	 * List of completions with amounts. Can be used to execute a completion on multiple payment instruments.
	 *
	 * If completions is not supplied any pre-authorised sub transactions will be completed
	 */
	completions?: CompletionItem[];
}

/**
 * Payment reference of the pre-authorised transaction to be completed.
 *
 * @category Model
 */
export interface CompletionItem {
	/** The payment reference for this transaction */
	paymentTransactionRef: string;
	/** The amount of the completed transaction */
	amount: number;
}
