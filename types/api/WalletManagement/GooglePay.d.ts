import { TokenizeGooglePayRequest } from "../../model/WalletManagementModel/TokenizeGooglePayRequest";
import { TokenizeGooglePayResponse } from "../../model/WalletManagementModel/TokenizeGooglePayResponse";

/**
 * @category API
 */
export interface GooglePayApi {
	/**
	 * Create a payment token for a provided Google Pay wallet item.
	 *
	 * @param tokenizeGooglePayRequest Detail of the Google Pay wallet item to be tokenized.
	 */
	tokenize(
		tokenizeGooglePayRequest: TokenizeGooglePayRequest
	): Promise<TokenizeGooglePayResponse>;

	/**
	 * Create a payment token for a provided Google Pay wallet item of a guest user.
	 *
	 * @param tokenizeGooglePayRequest Detail of the Google Pay wallet item to be tokenized.
	 */
	guestTokenize(
		tokenizeGooglePayRequest: TokenizeGooglePayRequest
	): Promise<TokenizeGooglePayResponse>;

	/**
	 * Update a Google Pay payment instrument.
	 *
	 * @param paymentToken The payment token of the google pay payment instrument to update.
	 * @param tokenizeGooglePayRequest Detail of the Google Pay wallet item to be tokenized.
	 */
	update(
		paymentToken: string,
		tokenizeGooglePayRequest: TokenizeGooglePayRequest
	): Promise<TokenizeGooglePayRequest>;
}
