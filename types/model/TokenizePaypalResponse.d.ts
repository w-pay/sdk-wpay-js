/**
 * The JSON response structure of the Tokenize PayPalApi endpoint.
 *
 * @category Model
 */
export interface TokenizePaypalResponse {
	payPal: {
		/* The new payment instrument id to be used for payments.*/
		paymentInstrumentId: string;

		/* The status of the payment instrument in the container. */
		status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

		/* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601.*/
		lastUpdated: string;

		/* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
		lastUsed: string;

		/* A flag to indicate if this payment instrument is the primary instrument in the container. */
		primary: boolean;

		/* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
		allowed: boolean;

		/* The PayPalApi email id. */
		payPalId: string;

		/* The PayPalApi customer id. */
		customerId: string;
	};
}
