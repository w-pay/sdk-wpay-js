/**
 * Map of merchant preferences.
 */
export type MerchantPreferences = Map<string, Map<string, string>>;

export interface MerchantPreferencesRepository {
	/**
	 * Retrieve a merchant's preferences.
	 */
	get(): Promise<MerchantPreferences>;

	/**
	 * Update a merchant's preferences
	 *
	 * @param preferences The preferences to use
	 */
	set(preferences: MerchantPreferences): Promise<void>;
}
