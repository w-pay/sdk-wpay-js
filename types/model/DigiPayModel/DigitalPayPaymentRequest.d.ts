import { DigitalPayAddress } from "./DigitalPayAddress";
import { DigitalPayFraudPayload } from "./DigitalPayFraudPayload";
import { DigitalPayTransactionType } from "./DigitalPayTransactionType";

/**
 * The JSON request structure of the Payments endpoint
 *
 * @category Model
 */
export interface DigitalPayPaymentRequest {
	/**
	 * Transaction type containers to use for all instruments.
	 *
	 * This object is only required if the payments request contains apple pay instruments.
	 */
	transactionType: DigitalPayTransactionType;

	/** A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system. */
	clientReference: string;

	/** The merchant order number of the transaction. */
	orderNumber: string;

	/** This object is only required if the payments request contains paypal instruments. */
	shippingAddress: DigitalPayAddress;

	/** List of payments */
	payments: DigitalPayPayment[];

	/** Extended merchant data */
	extendedMerchantData?: ExtendedMerchantData[];

	/** Set to null to skip the cybersource fraud check. */
	fraudPayload?: DigitalPayFraudPayload;

	/** Store data */
	storeData?: DigitalPayStoreData;
}

export interface DigitalPayPayment {
	/**
	 * The payment instrument id from the card capture iframe response or the list payment instruments response.
	 *
	 * This property can be omitted if the payment token property is present.
	 */
	paymentInstrumentId: string;

	/**
	 * The payment token from the card capture iframe response or the list payment instruments response.
	 *
	 * This property can be omitted if the payment instrument id property is present.
	 */
	paymentToken: string;

	/** The amount you want to pay with the payment instrument. */
	amount: number;

	/**
	 * The step-up token is used to track additional credit card information (eg. CVV and expiry) attached to the payment instrument.
	 *
	 * It's only valid for a predefined time and if an expired step-up token is used during payment, the payment for that instrument will fail and the user will have to get a new step-up token before retrying the payment. A step-up token is returned in the response of a credit card iframe.
	 *
	 * This property is currently only required for credit card instruments and only if specific credit card information (eg. CVV and expiry) is required during payment.
	 */
	stepUpToken?: string;

	/**
	 * The passcode is used to send additional information (eg. gift card PIN) for the payment instrument.
	 *
	 * This property is currently only required for gift card instruments and only if the gift card PIN is required during payment.
	 *
	 * This property should NOT be used with credit card instruments (see stepUpToken).
	 */
	passcode?: string;
}

export interface DigitalPayStoreData {
	/** The in-store payment transaction store id. */
	storeId: string;

	/** The in-store payment transaction store id. This is a 12 digit \"0\" [zero] padded numeric string. */
	rrn: string;

	/** The in-store payment transaction timestamp. The timestamp format is milliseconds since epoch. */
	transactionTimestamp: number;
}

export interface ExtendedMerchantData {
	/** The name of the extended merchant data field. */
	field: "correlationId";

	/** The value of the extended merchant data field. */
	value: string;
}
