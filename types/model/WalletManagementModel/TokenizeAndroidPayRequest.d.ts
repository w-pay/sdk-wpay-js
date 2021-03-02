/**
 * The JSON request structure of the Tokenize Android Pay endpoint.
 *
 * @category Model
 */

export interface TokenizeAndroidPayRequest {
	/** The "encryptedMessage" value from the Android Pay wallet.*/
	encryptedMessage: string;

	/** The "ephemeralPublicKey" value from the Android Pay wallet. */
	ephemeralPublicKey: string;

	/** The "tag" value from the Android Pay wallet. */
	tag: string;

	/** The "publicKeyHash" value from the merchant profile response. */
	publicKeyHash: string;

	/** The type/schema value from the Android Pay wallet. */
	instrumentType: string;

	/** A flag to indicate if this payment instrument has to be set as the primary instrument. */
	primary: boolean;

	/** The display text returned by the Android Pay wallet. */
	comment: string;
}
