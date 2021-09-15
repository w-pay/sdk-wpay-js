import { PaymentTransactionType } from "../PaymentTransactionType";
import { DigitalPayAddress } from "./DigitalPayAddress";
import { DigitalPayFraudPayload } from "./DigitalPayFraudPayload";

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
	transactionType: PaymentTransactionType;

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

	/** This object is only required if the payments request is for an in-store payment transaction. */
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

	/** This object is used to pass additonal control data to Digital Pay */
	controlData?: DigitalPayControlData;

	/** This object is only required if the payments request requires 3DS challenge response data to be sent to Digital Pay. */
	threeDS?: DigitalPayThreeDS;
}

export interface DigitalPayStoreData {
	/** The payment transaction merchant group id. The group id is defined as a logical grouping of merchants or stores. A default configured group id is set in Apigee if absent in the payload. */
	groupId?: string;

	/** The in-store payment transaction terminal id. This is a 8 character alphanumeric string. If present in the payload the 'storeId' has to be omitted. */
	terminalId: string;

	/** The in-store payment transaction store id. */
	storeId: string;

	/** The in-store payment transaction lane id. */
	laneId?: string;

	/** The System Trace Audit Number (STAN) used to identify the transaction. This is a 6 digit numeric string. */
	stan: string;

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

export interface DigitalPayControlData {
	/** The Digital Pay token type to use for a scheme card instrument during 3DS processing for merchants that have 3DS enabled. Defaults to 'PAN' if absent. **/
	tokenType?: "SCHEME_TOKEN" | "SCDR" | "PAN";
}

export interface DigitalPayThreeDS {
	/** The Protocol Version Number of the specification utilised by the system creating this message. */
	messageVersion: string;

	/** The transaction identifier. Required for Mastercard and Amex. Not applicable for Visa. */
	xid: string;

	/** The payment system-specific value provided by the ACS or the Directory Server (DS) using an algorithm defined by Payment System. */
	authenticationValue: string;

	/** The Directory Server (DS) authentication identification code. A universally unique transaction identifier assigned by the DS to identify a single transaction. The format of the value is defined in IETF RFC 4122. It may utilise any of the specified versions if the output meets specific requirements. */
	dsTransID: string;

	/** The electronic commerce indicator. Required for calculating the SLI. A Payment System-specific value provided by the ACS or DS to indicate the results of the attempt to authenticate the Cardholder. */
	eci: string;

	/** The payer authentication response status. Required for Visa.
	 *  Y: Customer was successfully authenticated
	 *  N: Customer failed or canceled authentication
	 *  C: Card challenged
	 *  R: Authentication rejected
	 *  A: Proof of authentication attempt was generated
	 *  U: Authentication not completed regardless of the reason
	 */
	aresStatus: "Y" | "N" | "C" | "R" | "A" | "U";

	/** The verification response enrollment status. Required for Visa.
	 *  Y: Card enrolled, must authenticate
	 *  N: Card not enrolled, proceed with authorization
	 *  U: Unable to authenticate regardless of the reason
	 *  B: Indicates that authentication was bypassed
	 */
	veresEnrolled: "Y" | "N" | "U" | "B";

	/** Indicates whether a transaction qualifies as an authenticated transaction or account verification.
	 *  Y: Authentication Successful
	 *  N: Not Authenticated
	 *  U: Authentication could not be performed
	 *  A: Attempts Processing Performed; Not authenticated
	 *  C: Challenge Required. Additional authentication is required
	 *  D: Challenge Required; Decoupled Authentication performed
	 *  R: Authentication Rejected. Issuer is rejecting
	 *  I: Informational Only
	 */
	transStatus: "Y" | "N" | "A" | "U" | "C" | "D" | "R" | "I";

	/** The SLI from the merchant */
	sli?: string;
}
