import { CreditCardStepUp } from "../PaymentInstruments";

/**
 * The JSON success response structure of the Payments endpoint.
 *
 * @category Model
 */
export interface DigitalPayPaymentResponse {
	/**
	 *  Container reference in the transaction logs.
	 *
	 * This number uniquely identifies the whole/grouped transaction in the container.
	 */
	transactionReceipt: string;

	/**
	 * A flag to indicate if a split payment was only partially successful,
	 *
	 * ie. at least 1 of the payment instruments had a successful payment result.
	 */
	partialSuccess: boolean;

	/** DigitalPay fraud response */
	fraudResponse: DigitalPayFraudResponse;

	/** DigitalPay payment credit card payments */
	creditCards: DigitalPayCreditCard[];

	/** DigitalPay payment gift card payments */
	giftCards: DigitalPayGiftCard[];

	/** DigitalPay PayPal card payments */
	payPal: DigitalPayPayPal[];

	/**
	 * Android Pay has been replaced by Google Pay.
	 *
	 * This property has been retained for backward compatibility and will always be an empty array.
	 */
	androidPay: any[];

	/** DigitalPay payment Google Pay payments */
	googlePay: DigitalPayGooglePay[];

	/** DigitalPay payment Apple Pay payments */
	applePay: DigitalPayApplePay[];

	/** DigitalPay payment unknown payments */
	unknown: DigtalPayPaymentInstrument[];
}

export interface DigitalPayFraudResponse {
	/** The fraud check client id. Will be null if the fraud check was skipped. */
	clientId: string;

	/** The fraud check reason code. Will be null if the fraud check was skipped. */
	reasonCode: string;

	/** The fraud check decision. Will be null if the fraud check was skipped. */
	decision: string;
}

export interface DigitalPayPaymentInstrument {
	/** The credit card payment instrument id. */
	paymentInstrumentId: string;

	/** The credit card payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/** Container reference in the transaction logs. This number uniquely identifies the credit card transaction in the container. */
	paymentTransactionRef: string;

	/** The error code. Only present if an error occurred during payment. */
	errorCode: string;

	/** The error message. Only present if an error occurred during payment. */
	errorMessage: string;

	/** The error detail. Only present if an error occurred during payment. */
	errorDetail: string;
}

export interface DigitalPayCreditCard extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This object is only included in the response if it is enabled in the consumers API configuration. */
	receiptData?: DigitalPayRecieptData;

	/** This array is only included in the response if it is enabled in the consumers API configuration. */
	extendedTransactionData?: DigitalPayExtendedTransactionData[];

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

	/**
	 * Special handling instructions that have to be executed after a payment.
	 *
	 * Only present if no error occurred during payment.
	 */
	handlingInstructions?: DigitalPayHandlingInstructions;
}

export interface DigitalPayGiftCard extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This object is only included in the response if it is enabled in the consumers API configuration. */
	receiptData?: DigitalPayRecieptData;

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

export interface DigitalPayPayPal extends DigitalPayPaymentInstrument {
	/** This object is only included in the response if it is enabled in the consumers API configuration. */
	receiptData?: DigitalPayRecieptData;

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

export interface DigitalPayGooglePay extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This array is only included in the response if it is enabled in the consumers API configuration. */
	extendedTransactionData?: DigitalPayExtendedTransactionData[];

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

export interface DigitalPayApplePay extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;
}

export interface DigitalPayRecieptData {
	/** The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
	cardSuffix: string;

	/** The credit card scheme. */
	scheme: string;

	/** The month of the expiry date of the credit card. */
	expiryMonth: string;

	/** The year of the expiry date of the credit card. */
	expiryYear: string;
}

export interface DigitalPayExtendedTransactionData {
	/**
	 * The name of the extended transaction data field.
	 *
	 * The 'token' field is only included in the response if it is enabled in the consumers API configuration.
	 */
	field: DigitalPayExtendedTransactionDataFieldName;

	/** The value of the extended transaction data field. */
	value: string;
}

export enum DigitalPayExtendedTransactionDataFieldName {
	BIN = "bin",
	STAN = "stan",
	RRN = "rrn",
	TOKEN = "token",
	MID = "mid",
	TERMINA_ID = "terminalId"
}
