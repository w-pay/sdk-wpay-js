/**
 * Request payload containing the refund reason and instructions
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
}
