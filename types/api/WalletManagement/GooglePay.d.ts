/**
 * @category API
 */
export interface GooglePay {
	/**
	 * Create a payment token for a provided Google Pay wallet item.
	 *
	 * @param
	 */
	tokenize(
		tokenizeGooglePayRequest: TokenizeGooglePayRequest
	): Promise<TokenizeGooglePayResponse>;

	/**
	 * Update a Google Pay payment instrument.
	 *
	 * @param
	 * @param
	 */
	update(
		paymentToken: string,
		tokenizeGooglePayRequest: TokenizeGooglePayRequest
	): Promise<TokenizeGooglePayRequest>;
}

/**
 * The JSON request structure of the Tokenize Google Pay endpoint.
 *
 * @category Model
 */
interface TokenizeGooglePayRequest {
	/** The type/schema value from the Google Pay wallet. */
	instrumentType: string;

	/** The display text returned by the Google Pay wallet. */
	comment: string;

	/** The "tokenData" payload from the Google Pay wallet. */
	tokenData: string;
}

/**
 * The JSON response structure of the Tokenize Google Pay endpoint.
 *
 * @category Model
 */
interface TokenizeGooglePayResponse {
	/** The new payment token to be used for payments. The payment token is a unique identifier for the payment instrument.*/
	paymentToken: string;
}
