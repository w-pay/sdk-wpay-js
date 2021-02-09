import { ApiAuthenticator } from "./ApiAuthenticator";
import { HasAccessToken } from "./HasAccessToken";

/**
 * An {@link ApiAuthenticator} that wraps an access token that is provided through means
 * outside the SDK.
 *
 * The responsibility for acquiring and managing the token is on the application.
 */
export class ProvidedTokenAuthenticator implements ApiAuthenticator<HasAccessToken> {
	constructor(public token: string) {}

	async authenticate(): Promise<HasAccessToken> {
		return {
			accessToken: this.token
		};
	}
}
