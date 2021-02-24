import { CustomerPreferences } from "../model";

/**
 * @category API
 */
export interface CustomerPreferencesApi {
	/**
	 * Retrieve a customer's preferences
	 */
	get(): Promise<CustomerPreferences>;

	/**
	 * Update the preferences for a customer
	 *
	 * @param preferences The preferences of the customer.
	 */
	set(preferences: CustomerPreferences): Promise<void>;
}
