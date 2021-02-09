import { ApiAuthenticator } from "./ApiAuthenticator";
import { CredentialsStore } from "./CredentialsStore";

/**
 * An {@link ApiAuthenticator} that stores credentials after successfully authenticating.
 *
 * @constructor
 * @param delegate An {@link ApiAuthenticator} that does the authentication.
 * @param store A {@link CredentialsStore} for storing the credentials.
 */
export class StoringApiAuthenticator<T> implements ApiAuthenticator<T> {
	constructor(
		private readonly delegate: ApiAuthenticator<T>,
		private readonly store: CredentialsStore<T>
	) {}

	async authenticate(): Promise<T> {
		const result: T = await this.delegate.authenticate();

		this.store.storeCredentials(result);

		return result;
	}
}
