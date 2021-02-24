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
