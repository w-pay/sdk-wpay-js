
import { ChargePaymentAgreementRequest } from "../model/ChargePaymentAgreement";
import { DigitalPayPaymentAgreementResponse } from "../model/DigiPayModel/DigitalPayPaymentAgreementResponse";

/**
 * @category API
 */
export interface CustomerPaymentAgreementsApi {
    /**
	 * Retrieve a list of customer's {@link PaymentAgreement}s
     * 
     * @param paymentToken The ID.
     * @param chargePaymentAgreementRequest details of charge to make against the payment agreement
	 */
	charge(paymentToken: string, chargePaymentAgreementRequest: ChargePaymentAgreementRequest): Promise<DigitalPayPaymentAgreementResponse>;

	/**
	 * Delete a {@link PaymentAgreement} by its associated payment token
	 *
	 * @param paymentToken The ID.
	 */
	delete(paymentToken: string): Promise<void>;	
}
