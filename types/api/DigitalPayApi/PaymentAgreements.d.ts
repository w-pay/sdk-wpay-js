import { DigitalPayChargePaymentAgreementRequest } from "../../model/DigiPayModel/DigitalPayChargePaymentAgreementRequest";
import { DigitalPayCreatePaymentAgreementRequest } from "../../model/DigiPayModel/DigitalPayCreatePaymentAgreementRequest";
import { DigitalPayPaymentAgreementResponse } from "../../model/DigiPayModel/DigitalPayPaymentAgreementResponse";
import { DigitalPayUpdatePaymentAgreementRequest } from "../../model/DigiPayModel/DigitalPayUpdatePaymentAgreementRequest";

/**
 * @category API
 */
export interface PaymentAgreementApi {
	/**
	 * Create a new payment agreement which will be added to the users wallet after validating the payment instrument.
	 *
	 * This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param paymentAgreementRequest detail of payment agreement to be created
	 */
	create(
		paymentAgreementRequest: DigitalPayCreatePaymentAgreementRequest
	): Promise<DigitalPayPaymentAgreementResponse>;

	/**
	 * Update an existing payment agreement and validate the payment instrument if changed.
	 *
	 * This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param paymentToken The payment agreement to update
	 * @param paymentAgreementRequest detail of payment agreement to be updated
	 */
	update(
		paymentToken: string,
		paymentAgreementRequest: DigitalPayUpdatePaymentAgreementRequest
	): Promise<DigitalPayPaymentAgreementResponse>;

	/**
	 * Perform charge transaction against a payment agreement.
	 *
	 * This service will use the provided information to perform the charge transaction.
	 *
	 * A charge payment is made by the merchant to charge a customer as per their payment agreement.
	 *
	 * This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param chargeRequest detail of payment agreement to be charged
	 */
	charge(
		chargeRequest: DigitalPayChargePaymentAgreementRequest
	): Promise<DigitalPayPaymentAgreementResponse>;

	/**
	 * Delete an existing payment agreement.
	 *
	 * This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param paymentToken The payment agreement to delete
	 */
	delete(paymentToken: string): Promise<void>;
}
