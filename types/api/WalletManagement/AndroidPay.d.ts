import { TokenizeAndroidPayRequest } from "../../model/WalletManagementModel/TokenizeAndroidPayRequest";
import { TokenizeAndroidPayResponse } from "../../model/WalletManagementModel/TokenizeAndroidPayResponse";

/**
 * @category API
 */
export interface AndroidPay {
	/**
	 * Create a payment instrument id for a provided Android Pay wallet item.
	 *
	 * @param
	 */
	tokenize(
		tokenizeAndroidPayRequest: TokenizeAndroidPayRequest
	): Promise<TokenizeAndroidPayResponse>;

	/**
	 * Update an Android Pay payment instrument.
	 *
	 * @param
	 * @param
	 */
	update(
		paymentInstrumentId: string,
		tokenizeAndroidPayRequest: TokenizeAndroidPayRequest
	): Promise<TokenizeAndroidPayResponse>;
}
