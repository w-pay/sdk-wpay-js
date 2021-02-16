/**
 * Abstracts how the SDK authenticates with the API.
 *
 * If an application has an existing authentication/authorisation workflow then an Adapter class
 * can be used to integrate that workflow into the SDK to provide the necessary authentication
 */
export interface ApiAuthenticator {
	/**
	 * Called by the SDK to obtain authentication details ie: an access token
	 *
	 * @return A access token suitable to use as a Bearer token
	 */
	authenticate(): Promise<string>;
}
