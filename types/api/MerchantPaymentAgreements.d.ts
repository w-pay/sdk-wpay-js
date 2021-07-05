import { ChargePaymentAgreementRequest } from "../model/ChargePaymentAgreement";
import { DigitalPayPaymentAgreementResponse } from "../model/DigiPayModel/DigitalPayPaymentAgreementResponse";

/**
 * @category API
 */
export interface MerchantPaymentAgreementsApi {
	/**
	 * Charge a {@link PaymentAgreement}s
	 *
	 * @param paymentToken The ID.
	 * @param chargePaymentAgreementRequest details of charge to make against the payment agreement
	 * @param fraudPayload used to complete the fraud check
	 */
	charge(
		paymentToken: string,
		chargePaymentAgreementRequest: ChargePaymentAgreementRequest,
		fraudPayload?: FraudPayload
	): Promise<DigitalPayPaymentAgreementResponse>;

	/**
	 * Delete a {@link PaymentAgreement} by its associated payment token
	 *
	 * @param paymentToken The ID.
	 */
	delete(paymentToken: string): Promise<void>;
}
