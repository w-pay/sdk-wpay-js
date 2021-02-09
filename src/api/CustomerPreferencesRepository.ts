/**
 * Map of customer preferences.
 */
export type CustomerPreferences = Map<string, Map<string, string>>;

export interface CustomerPreferencesRepository {
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
