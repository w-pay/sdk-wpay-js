import { Wallet } from "./Wallet";

/**
 * Initiate the addition of a new payment instrument for this customer.
 *
 * This API returns a URL to be used to access the DigiPay IFrame based interface to request the customer to enter a payment instrument details.
 *
 * @category Model
 */
export interface PaymentInstrumentAddition {
	/** The unique reference for this interaction as defined by the client application */
	clientReference: string;
}

/**
 * The result of trying to initiate the addition of a new {@link PaymentInstrument}
 *
 * @category Model
 */
export interface PaymentInstrumentAdditionResult {
	/** The URL of an iframe. This iframe is used to capture a credit card number, expiry and CVV */
	cardCaptureURL: string;

	/** Container reference in the transaction logs. This number uniquely identifies the transaction in the container */
	transactionRef?: string;
}
