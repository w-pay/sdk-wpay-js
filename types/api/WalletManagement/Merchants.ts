import { MerchantProfileResponse } from "../../model/WalletManagementModel/MerchantProfileResponse";

/**
 * @category API
 */
export interface Merchants {
	/**
	 * Get the current configuration set of the merchant. If this API is called without a valid access token it is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param
	 */
	profile(): Promise<MerchantProfileResponse>;
}
