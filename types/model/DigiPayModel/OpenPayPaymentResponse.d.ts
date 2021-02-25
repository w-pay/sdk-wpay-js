import { CreditCardStepUp } from "../PaymentInstruments";
import {
	DigitalPayApplePay,
	DigitalPayFraudResponse,
	DigitalPayGiftCard,
	DigitalPayPaymentInstrument,
	DigitalPayPayPal,
	DigitalPayRecieptData
} from "./DigitalPayPaymentResponse";

/**
 * The JSON success response structure of the Payments endpoint.
 *
 * @category Model
 */
export interface OpenPayPaymentResponse {
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

	/** OpenPay fraud response */
	fraudResponse: DigitalPayFraudResponse;

	/** OpenPay payment credit card payments */
	creditCards: OpenPayCreditCard[];

	/** OpenPay payment gift card payments */
	giftCards: DigitalPayGiftCard[];

	/** OpenPay PayPal card payments */
	payPal: DigitalPayPayPal[];

	/**
	 * Android Pay has been replaced by Google Pay.
	 *
	 * This property has been retained for backward compatibility and will always be an empty array.
	 */
	androidPay: any[];

	/** OpenPay payment Google Pay payments */
	googlePay: OpenPayGooglePay[];

	/** OpenPay payment Apple Pay payments */
	applePay: DigitalPayApplePay[];

	/** OpenPay payment unknown payments */
	unknown: DigitalPayPaymentInstrument[];
}

export interface OpenPayCreditCard extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This object is only included in the response if it is enabled in the consumers API configuration. */
	receiptData?: DigitalPayRecieptData;

	/** This array is only included in the response if it is enabled in the consumers API configuration. */
	extendedTransactionData?: OpenPayExtendedTransactionData[];

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
	handlingInstructions?: OpenPayHandlingInstructions;
}

export interface OpenPayGooglePay extends DigitalPayPaymentInstrument {
	/** Only present if an error occurred during payment. */
	stepUp?: CreditCardStepUp;

	/** This array is only included in the response if it is enabled in the consumers API configuration. */
	extendedTransactionData?: OpenPayExtendedTransactionData[];

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

export interface OpenPayHandlingInstructions {
	/** The handling instruction message. */
	instructionMessage: string;

	/** The handling instruction code. */
	instructionCode: OpenPayInstructionCode;
}

export interface OpenPayExtendedTransactionData {
	/**
	 * The name of the extended transaction data field.
	 *
	 * The 'token' field is only included in the response if it is enabled in the consumers API configuration.
	 */
	field: OpenPayExtendedTransactionDataFieldName;

	/** The value of the extended transaction data field. */
	value: string;
}

export enum OpenPayInstructionCode {
	100 = "100",
	110 = "110",
	120 = "120"
}

export enum OpenPayExtendedTransactionDataFieldName {
	OPEN_PAY_TRANSACTION_ID = "openPayTransactionId",
	OPEN_PAY_ORDER_ID = "openPayOrderId",
	OPEN_PAY_PAYMENT_METHOD = "openPayPaymentMethod",
	OPEN_PAY_CREATED_AT = "openPayCreatedAt",
	OPEN_PAY_BILLING_ACCOUNT_ID = "openPayBillingAccountId",
	OPEN_PAY_BILLING_ACCOUNT_NAME = "openPayBillingAccountName",
	OPEN_PAY_BILLING_ACCOUNT_ABN = "openPayBillingAccountABN"
}
