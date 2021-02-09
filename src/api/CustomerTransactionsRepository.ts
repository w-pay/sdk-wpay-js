import { CustomerTransactionDetails, CustomerTransactionSummaries } from "../model";

export interface CustomerTransactionsRepository {
	/**
	 * Retrieve a list of previously executed transactions for the customer.
	 *
	 * @param paymentRequestId If present, limits the list of transactions to those that relate to the payment request.
	 * @param page The page of results to return with 1 indicating the first page (defaults to 1).
	 * @param pageSize The number of records to return for this page (current default is 25)
	 * @param endTime If present, transactions newer than this time will not be returned.
	 * @param startTime If present, transactions older than this time will not be returned
	 */
	list(
		paymentRequestId?: string,
		page?: number,
		pageSize?: number,
		endTime?: Date,
		startTime?: Date
	): Promise<CustomerTransactionSummaries>;

	/**
	 * Retrieve details about a specific transaction
	 *
	 * @param transactionId The transaction id
	 */
	getById(transactionId: string): Promise<CustomerTransactionDetails>;
}
