import { StartSessionApplePayRequest } from "../../model/WalletManagementModel/StartSessionApplePayRequest";
import { TokenizeApplePayRequest } from "../../model/WalletManagementModel/TokenizeApplePayRequest";
import { TokenizeApplePayResponse } from "../../model/WalletManagementModel/TokenizeApplePayResponse";

/**
 * @category API
 */
export interface ApplePayApi {
	/**
	 * Start a session with Apple using validationUrl during onvalidatemerchant event. Merchant must be registered with WPay for Apple Pay before using this call.
	 *
	 * @param startSessionApplePayRequest Detail of the start session request.
	 */
	startSession(startSessionApplePayRequest: StartSessionApplePayRequest): Promise<any>;
	 
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
