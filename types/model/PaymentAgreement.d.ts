import { PaymentInstrumentStatus } from "./PaymentInstruments";

/**
 * Properties of a Payment Agreement
 *
 * @category Model
 */
export interface PaymentAgreement {
	/** The payment token of the payment agreement. The payment token is a unique identifier for the payment agreement. */
	paymentToken?: string;

	/** The status of the payment agreement in the container. */
	status?: PaymentInstrumentStatus;

	/** The timestamp the payment agreement was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated?: Date;

	/** The timestamp the payment agreement was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed?: Date;

	/** The timestamp for when the payment instrument was added. The timestamp format is ISO8601. */
	createdOn?: Date;

	/** A flag to indicate if this payment instrument is the primary instrument in the container. Not used for payment agreements. */
	primary?: boolean;

	/** A flag to indicate if the merchant profile in the container allows the use of this payment agreement. */
	allowed?: boolean;

	/** The payment agreement type. */
	type: PaymentAgreementType;

	/** The payment agreement payment instrument id that will be used for the charges. */
	paymentInstrumentId: string;

	/** The credit card scheme. */
	scheme?: string;

	/** The suffix (last 4 digits) of the credit card number. */
	cardSuffix?: string;

	/** The month of the expiry date of the credit card. */
	expiryMonth?: string;

	/** The year of the expiry date of the credit card. */
	expiryYear?: string;

	/** The payment agreement start date and time. The timestamp format is ISO8601. */
	startDate?: Date;

	/** The payment agreement end date and time. The timestamp format is ISO8601. */
	endDate?: Date;

	/** The payment agreement charge frequency. */
	chargeFrequency: PaymentAgreementChargeFrequency;

	/** The amount that will be charged at the frequency specified in the payment agreement. */
	chargeAmount: number;

	/** The current charge cycle number. */
	chargeCycle?: number;

	/** A flag to indicate if the payment agreement is expired. */
	expired?: boolean;

	/** The URL of the endpoint to use to update the payment agreement. */
	updateURL?: string;

	stepUp?: {
		/* The type of the step up action. For credit cards this will be CAPTURE_CVV which identifies that the consumer must capture the CVV prior to payment. */
		type: string;

		/* A flag to indicate if this step up (action) is mandatory. */
		mandatory: boolean;

		/* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV or CVV only. The URL will automatically switch between expiry and CVV or CVV only endpoints based on the container requirement. */
		url: string;
	};

	/** A description of the payment agreement */
	description?: string;
}

/**
 * List of payments agreements.
 *
 * @category Model
 */
export interface PaymentAgreements {
	/** The resulting list of payment agreements. */
	paymentAgreements: PaymentAgreement[];
}

/**
 * Frequency with which the payment agreement is charged
 *
 * @category Model
 */
export enum PaymentAgreementChargeFrequency {
	WEEKLY = "WEEKLY",
	FORTNIGHTLY = "FORTNIGHTLY",
	MONTHLY = "MONTHLY"
}

/**
 * Type of payment agreement
 *
 * @category Model
 */
export enum PaymentAgreementType {
	RECURRING = "RECURRING",
	ADHOC = "ADHOC",
	INSTALLMENT = "INSTALLMENT"
}
