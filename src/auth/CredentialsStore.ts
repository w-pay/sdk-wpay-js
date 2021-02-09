/**
 * Abstracts how the SDK stores credentials obtained after authenticating with the API
 *
 * @param T The type of credentials being stored
 */
export interface CredentialsStore<T> {
	/**
	 * Stores credentials for later use
	 *
	 * @param credentials The credentials to store
	 */
	storeCredentials(credentials: T): void;
}
