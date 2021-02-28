import { TokenizeApplePayRequest } from "../../model/WalletManagementModel/TokenizeApplePayRequest";
import { TokenizeApplePayResponse } from "../../model/WalletManagementModel/TokenizeApplePayResponse";

/**
 * @category API
 */
export interface ApplePay {
	/**
	 * Create a payment instrument id for a provided Apple Pay wallet item.
	 *
	 * @param
	 */
	tokenize(tokenizeApplePayRequest: TokenizeApplePayRequest): Promise<TokenizeApplePayResponse>;

	/**
	 * Create a payment instrument id for a provided Apple Pay wallet item of a guest user.
	 *
	 * @param
	 */
	guestTokenize(
		tokenizeApplePayRequest: TokenizeApplePayRequest
	): Promise<TokenizeApplePayResponse>;

	/**
	 * Update an Apple Pay payment instrument.
	 *
	 * @param
	 * @param
	 */
	update(
		paymentInstrumentId: string,
		tokenizeApplePayRequest: TokenizeApplePayRequest
	): Promise<TokenizeApplePayResponse>;
}
