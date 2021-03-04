import { TokenizeApplePayRequest } from "../../model/WalletManagementModel/TokenizeApplePayRequest";
import { TokenizeApplePayResponse } from "../../model/WalletManagementModel/TokenizeApplePayResponse";

/**
 * @category API
 */
export interface ApplePayApi {
	/**
	 * Create a payment instrument id for a provided Apple Pay wallet item.
	 *
	 * @param tokenizeApplePayRequest Detail of the Apple Pay wallet item to be tokenized.
	 */
	tokenize(tokenizeApplePayRequest: TokenizeApplePayRequest): Promise<TokenizeApplePayResponse>;

	/**
	 * Create a payment instrument id for a provided Apple Pay wallet item of a guest user.
	 *
	 * @param tokenizeApplePayRequest Detail of the Apple Pay wallet item to be tokenized.
	 */
	guestTokenize(
		tokenizeApplePayRequest: TokenizeApplePayRequest
	): Promise<TokenizeApplePayResponse>;

	/**
	 * Update an Apple Pay payment instrument.
	 *
	 * @param paymentInstrumentId The id of the Apple Pay payment instrument to update.
	 * @param tokenizeApplePayRequest Detail of the Apple Pay wallet item to be tokenized.
	 */
	update(
		paymentInstrumentId: string,
		tokenizeApplePayRequest: TokenizeApplePayRequest
	): Promise<TokenizeApplePayResponse>;
}
