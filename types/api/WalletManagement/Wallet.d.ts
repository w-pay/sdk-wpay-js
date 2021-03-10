import { WalletDeleteRequest } from "../../model/WalletManagementModel/WalletDeleteRequest";
import { WalletDeleteResponse } from "../../model/WalletManagementModel/WalletDeleteResponse";

/**
 * @category API
 */
export interface WalletApi {
	/**
	 * Delete a consumers wallet. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param walletDeleteRequest Detail of the consumer who will have their the wallet deleted.
	 */
	delete(walletDeleteRequest: WalletDeleteRequest): Promise<WalletDeleteResponse>;
}
