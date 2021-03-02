/**
 * The JSON request structure of the Tokenize PayPalApi endpoint.
 *
 * @category Model
 */
export interface TokenizePaypalRequest {
	/* The PayPalApi nonce that will be used during a PayPalApi payment. */
	nonce: string;

	/* A flag to indicate if this payment instrument has to be set as the primary instrument. */
	primary: boolean;
}
