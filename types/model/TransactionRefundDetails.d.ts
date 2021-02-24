/**
 * Request payload containing the refund reason and instructions
 *
 * @category Model
 */
export interface TransactionRefundDetails {
	/** The reason for the refund, or other message logged with the transaction */
	reason: string;

	/**
	 * An optional client reference to be associated with the transaction.
	 *
	 * If not supplied the transactionId will be used.
	 */
	clientReference?: string;

	/**
	 * List of payments and amounts to refund. Can be used to refund to multiple payment instruments or to issue partial refunds.
	 * 
	 * If subTransactions is not supplied the entire transaction will be refunded.
	 */
	subTransactions?: RefundSubTransaction[]
}

/**
 * Payment reference and an amount to be refunded to it.
 *
 * @category Model
 */
export interface RefundSubTransaction {
	/** The payment reference for this sub transaction */
	subTransactionRef: string;
	/** The amount to be refunded as part of this transaction */
	amount: number;
}
