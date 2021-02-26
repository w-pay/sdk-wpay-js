import { TokenizePaypalResponse } from "../../model/TokenizePaypalResponse";
import { TokenizePaypalRequest } from "../../model/WalletManagementModel/TokenizePaypalRequest";

/**
 * @category API
 */
export interface Paypal {
	/**
	 * Create a paymment intrument id for a provided paypal account.
	 *
	 * @param
	 */
	tokenize(tokenizePaypalRequest: TokenizePaypalRequest): Promise<TokenizePaypalResponse>;


	/**
	 * 	Create a paymment intrument id for a provided paypal account of a guest user.
	 *
	 * @param
	 */
	guestTokenize(tokenizePaypalRequest: TokenizePaypalRequest): Promise<TokenizePaypalResponse>;
}
