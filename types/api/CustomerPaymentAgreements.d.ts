import {
	PaymentAgreement,
	PaymentAgreements,
	CreatePaymentAgreementRequest,
	UpdatePaymentAgreementRequest
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
	 */
	create(paymentAgreement: CreatePaymentAgreementRequest): Promise<PaymentAgreement>;

	/**
	 * Update a {@link PaymentAgreement}
	 *
	 * @param paymentToken The payment token to update
	 * @param paymentAgreement The updates to apply to the payment agreement
	 */
	update(
		paymentToken: string,
		paymentAgreement: UpdatePaymentAgreementRequest
	): Promise<PaymentAgreement>;
}
