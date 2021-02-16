import { Preferences } from "../model";

/**
 * @category API
 */
export interface MerchantPreferencesApi {
	/**
	 * Retrieve a merchant's preferences.
	 */
	get(): Promise<Preferences>;

	/**
	 * Update a merchant's preferences
	 *
	 * @param preferences The preferences to use
	 */
	set(preferences: Preferences): Promise<void>;
}
