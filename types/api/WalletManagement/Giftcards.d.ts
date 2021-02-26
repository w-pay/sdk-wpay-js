import { GiftcardsBalanceRequest } from "../../model/WalletManagementModel/GiftcardsBalanceRequest";
import { GiftcardsBalanceResponse } from "../../model/WalletManagementModel/GiftcardsBalanceResponse";
import { TokenizeGiftcardRequest } from "../../model/WalletManagementModel/TokenizeGiftcardRequest";
import { TokenizeGiftcardResponse } from "../../model/WalletManagementModel/TokenizeGiftcardResponse";

/**
 * @category API
 */
export interface Giftcards {
	/**
	 * Create a paymment intrument id for a provided gift card.
	 *
	 * @param
	 */
	tokenize(tokenizeGiftcardRequest: TokenizeGiftcardRequest): Promise<TokenizeGiftcardResponse>;

	/**
	 * Create a paymment intrument id for a provided gift card of a guest user.
	 *
	 * @param
	 */
	guestTokenize(tokenizeGiftcardRequest: TokenizeGiftcardRequest): Promise<TokenizeGiftcardResponse>;

	/**
	 * Get the balance and expiryinfo for the provided gift cards. This API is rate limited to 5 requests per minute per shopper id.
	 *
	 * @param
	 */
	balance(giftcardsBalanceRequest: GiftcardsBalanceRequest): Promise<GiftcardsBalanceResponse>;
}
