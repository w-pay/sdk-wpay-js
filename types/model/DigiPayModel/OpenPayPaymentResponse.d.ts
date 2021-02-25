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
export interface OpenPayPaymentTransactionResponse {
	/**
	 * Container reference in the transaction logs.
	 *
	 *  This number uniquely identifies the whole/grouped transaction in the container.
	 */
	transactionReceipt: string;

	/** List of OpenPay payment responses */
	paymentResponses: OpenPayPaymentResponse[];
}

export interface OpenPayPaymentResponse {
	/** The payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/** Container reference in the transaction logs. This number uniquely identifies the openpay transaction in the container. */
	paymentTransactionRef: string;

	/** This array is only included in the response if it is enabled in the consumers API configuration. */
	extendedTransactionData?: OpenPayExtendedTransactionData[];

	/**
	 * The external service code (from eg. Openpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceCode?: string;

	/**
	 * The external service message (from eg. Openpay).
	 *
	 * This property is only included in the response if it is enabled in the consumers API configuration.
	 */
	externalServiceMessage?: string;
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

export enum OpenPayExtendedTransactionDataFieldName {
	OPEN_PAY_TRANSACTION_ID = "openPayTransactionId",
	OPEN_PAY_ORDER_ID = "openPayOrderId",
	OPEN_PAY_PAYMENT_METHOD = "openPayPaymentMethod",
	OPEN_PAY_CREATED_AT = "openPayCreatedAt",
	OPEN_PAY_BILLING_ACCOUNT_ID = "openPayBillingAccountId",
	OPEN_PAY_BILLING_ACCOUNT_NAME = "openPayBillingAccountName",
	OPEN_PAY_BILLING_ACCOUNT_ABN = "openPayBillingAccountABN"
}
