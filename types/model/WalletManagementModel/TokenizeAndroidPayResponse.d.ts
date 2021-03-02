/**
 * The JSON response structure of the Tokenize Android Pay endpoint.
 *
 * @category Model
 */
export interface TokenizeAndroidPayResponse {
	/** The new payment instrument id to be used for payments. */
	paymentInstrumentId: string;

	/** The step-up token to be used for payments. */
	stepUpToken: string;
}
