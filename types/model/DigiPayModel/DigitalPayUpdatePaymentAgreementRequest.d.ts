import { DigitalPayAddress } from "./DigitalPayAddress";
import { DigitalPayRequestPaymentAgreement } from "./DigitalPayCreatePaymentAgreementRequest";
import { DigitalPayFraudResponse } from "./DigitalPayPaymentResponse";

/**
 * The JSON request structure of the Update Payment Agreement endpoint.
 *
 * @category Model
 */
export interface DigitalPayUpdatePaymentAgreementRequest {
	/**
	 * A merchant application specific reference number.
	 *
	 * This number should uniquely identify the transaction in the merchant’s system.
	 */
	clientReference: string;

	/**
	 * A merchant application specific reference number.
	 *
	 * This number should uniquely identify the customer in the merchant’s system.
	 */
	customerRef?: string;

	/**
	 * The merchant order number of the transaction.
	 *
	 * This property is only required if the 'immediateCharge' property is true.
	 */
	orderNumber?: string;

	/** Customer billing address for this payment agreement */
	billingAddress?: DigitalPayAddress;

	/** Detail of the payment agreement to be created */
	paymentAgreement?: DigitalPayRequestPaymentAgreement;

	/** Digital pay fraud payload */
	fraudPayload?: DigitalPayFraudResponse;
}
