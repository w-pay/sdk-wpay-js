import {
	ChallengeResponse,
	ImmediatePaymentRequest,
	PaymentPreferences,
	PaymentTransactionType
} from "../model";
import { CustomerPaymentRequest } from "../model";
import { CustomerTransactionSummary } from "../model";
import { SecondaryPaymentInstrument } from "../model";
import { FraudPayload } from "../model/FraudPayload";

/**
 * @category API
 */
export interface CustomerPaymentRequestsApi {
	/**
	 * Retrieve a {@link CustomerPaymentRequest} by its ID
	 *
	 * @param paymentRequestId The ID.
	 */
	getById(paymentRequestId: string): Promise<CustomerPaymentRequest>;

	/**
	 * Retrieve a {@link CustomerPaymentRequest} by a QR code ID associated to the request
	 *
	 * @param qrCodeId The QR Code ID.
	 */
	getByQRCodeId(qrCodeId: string): Promise<CustomerPaymentRequest>;

	/**
	 * Make a payment for a {@link CustomerPaymentRequest}
	 *
	 * @param paymentRequestId The {@link CustomerPaymentRequest} to pay for.
	 * @param primaryInstrument The primary (or only) instrument to use to make the payment. If not present then the primary instrument from the customer preferences will be used.
	 * @param secondaryInstruments Other payment instruments to use to split payment.
	 * @param skipRollback An optional flag to indicate that the automatic rollback step should be skipped in the case of failure
	 * @param clientReference An optional client reference to be associated with the transaction.
	 * @param preferences Optional payment preferences.
	 * @param challengeResponses Used when needing to complete challenge(s) to complete payment.
	 * @param fraudPayload Used to complete the fraud check.
	 * @param transactionType  The transaction types to use for each instrument type.
	 * @param allowPartialSuccess An optional flag allowing the consumer to indicate that a partial success will not trigger a failure and rollback
	 */
	makePayment(
		paymentRequestId: string,
		primaryInstrument?: string,
		secondaryInstruments?: SecondaryPaymentInstrument[],
		skipRollback?: boolean,
		clientReference?: string,
		preferences?: PaymentPreferences,
		challengeResponses?: ChallengeResponse[],
		fraudPayload?: FraudPayload,
		transactionType?: PaymentTransactionType,
		allowPartialSuccess?: boolean
	): Promise<CustomerTransactionSummary>;

	/**
	 * Create a new {@link CustomerPaymentRequest} and immediately make a charge against it
	 *
	 * @param immediatePaymentRequest Details of the payment being made
	 * @param challengeResponses Used when needing to complete challenge(s) to complete payment.
	 * @param fraudPayload Used to complete the fraud check.
	 */
	makeImmediatePayment(
		immediatePaymentRequest: ImmediatePaymentRequest,
		challengeResponses?: ChallengeResponse[],
		fraudPayload?: FraudPayload
	): Promise<CustomerTransactionSummary>;
}
