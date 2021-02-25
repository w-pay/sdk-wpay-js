import { DigitalPayPaymentAgreement } from "./DigitalPayCreatePaymentAgreementRequest";
import {
	DigitalPayExtendedTransactionData,
	DigitalPayFraudResponse
} from "./DigitalPayPaymentResponse";

/**
 * The JSON response structure of the Create and Update Payment Agreement endpoints.
 *
 * @category Model
 */
export interface DigitalPayPaymentAgreementResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the transaction in the container.
	 */
	transactionReceipt: string;

	/**
	 * The payment token of the payment agreement.
	 *
	 * The payment token is a unique identifier for the payment agreement.
	 */
	paymentToken?: string;

	/** Detail of the payment agreement that has been created or updated */
	paymentAgreement: DigitalPayPaymentAgreement;

	/** Fraud response */
	fraudResponse?: DigitalPayFraudResponse;

	/** Extended transaction data object */
	extendedTransactionData?: DigitalPayExtendedTransactionData;

	/**
	 * The external service code (from eg. Webpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceCode?: string;

	/**
	 * The external service message (from eg. Webpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceMessage?: string;
}
