/**
 * The JSON response structure of the Tokenize Google Pay endpoint.
 *
 * @category Model
 */
export interface TokenizeGooglePayResponse {
	/** The new payment token to be used for payments. The payment token is a unique identifier for the payment instrument.*/
	paymentToken: string;
}
