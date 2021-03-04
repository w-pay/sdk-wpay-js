import { MerchantProfileResponse } from "../../model/WalletManagementModel/MerchantProfileResponse";

/**
 * @category API
 */
export interface MerchantsApi {
	/**
	 * Get the current configuration set of the merchant. If this API is called without a valid access token it is IP restricted to allow unauthenticated server side calls.
	 */
	profile(): Promise<MerchantProfileResponse>;
}
