import { WalletDeleteRequest } from "../../model/WalletManagementModel/WalletDeleteRequest";
import { WalletDeleteResponse } from "../../model/WalletManagementModel/WalletDeleteResponse";

/**
 * @category API
 */
export interface Wallet {
	/**
	 * Delete a consumers wallet. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param
	 */
	delete(walletDeleteRequest: WalletDeleteRequest): Promise<WalletDeleteResponse>;
}
