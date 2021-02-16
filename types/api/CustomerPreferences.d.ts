import { Preferences } from "../model";

/**
 * @category API
 */
export interface CustomerPreferencesApi {
	/**
	 * Retrieve a customer's preferences
	 */
	get(): Promise<Preferences>;

	/**
	 * Update the preferences for a customer
	 *
	 * @param preferences The preferences of the customer.
	 */
	set(preferences: Preferences): Promise<void>;
}
