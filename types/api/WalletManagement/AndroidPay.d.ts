import { TokenizeAndroidPayRequest } from "../../model/WalletManagementModel/TokenizeAndroidPayRequest";
import { TokenizeAndroidPayResponse } from "../../model/WalletManagementModel/TokenizeAndroidPayResponse";

/**
 * @category API
 */
export interface AndroidPayApi {
	/**
	 * Create a payment instrument id for a provided Android Pay wallet item.
	 *
	 * @param tokenizeAndroidPayRequest Detail of the Android Pay wallet item to be tokenized.
	 */
	tokenize(
		tokenizeAndroidPayRequest: TokenizeAndroidPayRequest
	): Promise<TokenizeAndroidPayResponse>;

	/**
	 * Update an Android Pay payment instrument.
	 *
	 * @param paymentInstrumentId The id of the Android Pay payment instrument to update.
	 * @param tokenizeAndroidPayRequest Detail of the Android Pay wallet item to be tokenized.
	 */
	update(
		paymentInstrumentId: string,
		tokenizeAndroidPayRequest: TokenizeAndroidPayRequest
	): Promise<TokenizeAndroidPayResponse>;
}
