import { TokenizeGooglePayRequest } from "../../model/WalletManagementModel/TokenizeGooglePayRequest";
import { TokenizeGooglePayResponse } from "../../model/WalletManagementModel/TokenizeGooglePayResponse";

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