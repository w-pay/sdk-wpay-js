import { CreatePaymentRequestResult } from "../model";
import { MerchantPaymentDetails, MerchantPaymentSummaries } from "../model";
import { MerchantTransactionSummary } from "../model";
import { NewPaymentRequest } from "../model";
import { TransactionRefundDetails } from "../model";
import { TransactionCompletionDetails } from "../model/TransactionCompletionDetails";
import { TransactionVoidDetails } from "../model/TransactionVoidDetails";

/**
 * @category API
 */
export interface MerchantPaymentsApi {
	/**
	 * Retrieve a list of the payments initiated by the merchant, both pending and complete
	 *
	 * @param type The type of payment requests to return
	 * @param page The page of results to return with 1 indicating the first page (defaults to 1).
	 * @param pageSize The number of records to return for this page (current default is 25)
	 */
	listPayments(
		type?: string,
		page?: number,
		pageSize?: number
	): Promise<MerchantPaymentSummaries>;

	/**
	 * Create a new payment request for a customer
	 *
	 * @param paymentRequest The details of the new payment request
	 */
	createPaymentRequest(paymentRequest: NewPaymentRequest): Promise<CreatePaymentRequestResult>;

	/**
	 * Retrieve a payment request by it's ID. The request may have been "completed" that is the customer has made a payment.
	 *
	 * @param paymentRequestId The ID of the payment request to return.
	 */
	getPaymentRequestDetailsBy(paymentRequestId: string): Promise<MerchantPaymentDetails>;

	/**
	 * Delete a payment request
	 *
	 * @param paymentRequestId The payment request to delete
	 */
	deletePaymentRequest(paymentRequestId: string): Promise<void>;

	/**
	 * Refund a transaction to a customer
	 *
	 * @param transactionId The transaction to be refunded.
	 * @param refundDetails The details of the refund.
	 */
	refundTransaction(
		transactionId: string,
		refundDetails: TransactionRefundDetails
	): Promise<MerchantTransactionSummary>;

	/**
	 * Complete a pre-authorised transaction
	 *
	 * @param transactionId The transaction to be completed.
	 * @param completionDetails The details of the completions.
	 */
	completeTransaction(
		transactionId: string,
		completionDetails: TransactionCompletionDetails
	): Promise<MerchantTransactionSummary>;

	/**
	 * Void a pre-authorised transaction
	 *
	 * @param transactionId The transaction to be voided.
	 * @param voidDetails The details of the voids.
	 */
	voidTransaction(
		transactionId: string,
		voidDetails: TransactionVoidDetails
	): Promise<MerchantTransactionSummary>;
}
