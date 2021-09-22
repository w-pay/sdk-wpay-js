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
	unknown: DigitalPayPaymentInstrument[];
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
	errorCode?: string;

	/** The error message. Only present if an error occurred during payment. */
	errorMessage?: string;

	/** The error detail. Only present if an error occurred during payment. */
	errorDetail?: string;
}

export interface DigitalPayCreditCard extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This object is only included in the response if it is enabled in the consumers API configuration. */
	receiptData?: DigitalPayCreditCardReceiptData;

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

	/** This object is only present if the payments response contains 3DS data from Digital Pay. */
	threeDS?: DigitalPayThreeDSResponse;
}

export interface DigitalPayHandlingInstructions {
	/** The handling instruction code. */
	instructionCode: DigitalPayInstructionCode;

	/** The handling instruction message. */
	instructionMessage: string;
}

export interface DigitalPayGiftCard extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This object is only included in the response if it is enabled in the consumers API configuration. */
	receiptData?: DigitalPayGiftCardReceiptData;

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
	receiptData?: DigitalPayPayPalReceiptData;

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

export interface DigitalPayCreditCardReceiptData {
	/** The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
	cardSuffix: string;

	/** The credit card scheme. */
	scheme: string;

	/** The month of the expiry date of the credit card. */
	expiryMonth: string;

	/** The year of the expiry date of the credit card. */
	expiryYear: string;
}

export interface DigitalPayGiftCardReceiptData {
	/** The suffix (last 4 digits) of the gift card number used in the WEX transaction. */
	cardSuffix: string;
}

export interface DigitalPayPayPalReceiptData {
	/** The Paypal email id. */
	payPalId: string;

	/** The Paypal customer id. */
	customerId: string;
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

export interface DigitalPayThreeDSResponse {
	/** Received in response to a Visa authenticated Purchase and PreAuth. Only present for Visa. */
	car?: string;

	/** The Directory Server (DS) authentication identification code. A universally unique transaction identifier assigned by the DS to identify a single transaction. The format of the value is defined in IETF RFC 4122. It may utilise any of the specified versions if the output meets specific requirements. */
	dsTransID: string;

	/** The SLI from the the schemes. */
	sli: string;
}

export enum DigitalPayExtendedTransactionDataFieldName {
	BIN = "bin",
	STAN = "stan",
	RRN = "rrn",
	TOKEN = "token",
	MID = "mid",
	TERMINA_ID = "terminalId"
}

export enum DigitalPayInstructionCode {
	"INSTRUCTION_100" = "100",
	"INSTRUCTION_110" = "110",
	"INSTRUCTION_120" = "120"
}
