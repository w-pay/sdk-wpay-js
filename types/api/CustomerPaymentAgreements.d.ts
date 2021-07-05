import {
	PaymentAgreement,
	PaymentAgreements,
	CreatePaymentAgreementRequest,
	UpdatePaymentAgreementRequest,
	ChallengeResponse
} from "../model";

/**
 * @category API
 */
export interface CustomerPaymentAgreementsApi {
	/**
	 * Retrieve a list of customer's {@link PaymentAgreement}s
	 */
	list(): Promise<PaymentAgreements>;

	/**
	 * Retrieve a {@link PaymentAgreement} by its associated payment token
	 *
	 * @param paymentToken The ID.
	 */
	getById(paymentToken: string): Promise<PaymentAgreement>;

	/**
	 * Create a {@link PaymentAgreement}
	 *
	 * @param paymentAgreement The details for the new payment agreement
	 * @param challengeResponses Used when needing to complete challenge(s) to complete payment.
	 * @param fraudPayload Used to complete the fraud check
	 */
	create(
		paymentAgreement: CreatePaymentAgreementRequest,
		challengeResponses?: ChallengeResponse[],
		fraudPayload?: FraudPayload
	): Promise<PaymentAgreement>;

	/**
	 * Update a {@link PaymentAgreement}
	 *
	 * @param paymentToken The payment token to update
	 * @param paymentAgreement The updates to apply to the payment agreement
	 * @param challengeResponses Used when needing to complete challenge(s) to complete payment.
	 * @param fraudPayload Used to complete the fraud check
	 */
	update(
		paymentToken: string,
		paymentAgreement: UpdatePaymentAgreementRequest,
		challengeResponses?: ChallengeResponse[],
		fraudPayload?: FraudPayload
	): Promise<PaymentAgreement>;
}
