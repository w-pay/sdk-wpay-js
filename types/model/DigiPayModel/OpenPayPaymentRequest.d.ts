/**
 * The JSON request structure of the Openpay Payments endpoint
 *
 * @category Model
 */
export interface OpenPayPaymentRequest {
	/** The container transaction type to use for openpay instruments */
	transactionType: OpenPayPaymentRequestTransactionType;

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

	/** The merchant order number of the transaction. */
	orderNumber: string;

	/** The channel from which this charge is originating, eg. Online, In-Store. */
	channel: string;

	/** The unique identifier for the merchants trading account. */
	tradingAccountId?: string;

	/** The merchants transaction date and time. The timestamp format is ISO8601. */
	merchantTransactedAt?: string;

	/** List of payments */
	payments: OpenPayPayments[];

	/** OpenPay store data */
	storeData: OpenPayStoreData;
}

export interface OpenPayStoreData {
	/** The payment transaction store id. */
	storeId: string;

	/** A pin for the payment method id. */
	pin: string;
}

export interface OpenPayPayments {
	/** The payment token. */
	paymentToken: string;

	/** The amount you want to pay with the payment instrument. */
	amount: number;

	/** The GST amount of the full amount you want to pay with the payment instrument. */
	gstAmount?: number;
}

export interface OpenPayPaymentRequestTransactionType {
	openPay: OpenPayTransactionType;
}

/** The container transaction type to use for openpay instruments */
export enum OpenPayTransactionType {
	PREAUTH = "PREAUTH",
	PURCHASE = "PURCHASE"
}
