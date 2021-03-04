import { TokenizePaypalResponse } from "../../model/TokenizePaypalResponse";
import { TokenizePaypalRequest } from "../../model/WalletManagementModel/TokenizePaypalRequest";

/**
 * @category API
 */
export interface PayPalApi {
	/**
	 * Create a paymment intrument id for a provided paypal account.
	 *
	 * @param tokenizePaypalRequest Detail of the paypal account to be tokenized.
	 */
	tokenize(tokenizePaypalRequest: TokenizePaypalRequest): Promise<TokenizePaypalResponse>;

	/**
	 * 	Create a paymment intrument id for a provided paypal account of a guest user.
	 *
	 * @param tokenizePaypalRequest Detail of the paypal account to be tokenized.
	 */
	guestTokenize(tokenizePaypalRequest: TokenizePaypalRequest): Promise<TokenizePaypalResponse>;
}
