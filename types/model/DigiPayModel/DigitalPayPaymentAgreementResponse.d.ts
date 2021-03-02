import { PaymentAgreementChargeFrequency, PaymentAgreementType } from "../PaymentAgreement";
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
	paymentAgreement: DigitalPayResponsePaymentAgreement;

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

export interface DigitalPayResponsePaymentAgreement {
	/** The payment agreement type. */
	type: PaymentAgreementType;

	/** The payment agreement payment instrument id that will be used for the charges. */
	paymentInstrumentId: string;

	/** The type of the payment instrument used in the payment agreement. */
	paymentInstrumentType: string;

	/** The credit card scheme */
	scheme: string;

	/** The suffix (last 4 digits) of the credit card number. */
	cardSuffix: string;

	/** The month of the expiry date of the credit card. */
	expiryMonth: string;

	/** The year of the expiry date of the credit card. */
	expiryYear: string;

	/** The payment agreement start date and time. The timestamp format is ISO8601. */
	startDate: string;

	/** The payment agreement end date and time. The timestamp format is ISO8601. */
	endDate: string;

	/** The payment agreement charge frequency. */
	chargeFrequency: PaymentAgreementChargeFrequency;

	/** The amount that will be charged at the frequency specified in the payment agreement. */
	chargeAmount: number;
}
