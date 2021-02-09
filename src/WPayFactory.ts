import {
	ApiAuthenticator,
	DoNothingApiAuthenticator,
	HasAccessToken,
	ProvidedTokenAuthenticator,
	StoringApiAuthenticator
} from "./auth";
import {
	ApiKeyRequestHeader,
	BearerTokenRequestHeader,
	RequestHeaderFactory,
} from "./headers";
import { WPayOptions } from "./WPayOptions";

export type ApiTokenType<A extends HasAccessToken> = string | ApiAuthenticator<A> | null;

/**
 * Base factory function that can be used to create components needed for an SDK instance.
 *
 * @param options
 * @param token An access token or ApiAuthenticator instance for obtaining an access token, or null.
 */
export function createSDKComponents<A extends HasAccessToken = HasAccessToken>(
	options: WPayOptions,
	token: ApiTokenType<A>
): [RequestHeaderFactory[], ApiAuthenticator<A | null>] {
	const factories: RequestHeaderFactory[] = [
		new ApiKeyRequestHeader(options)
	];

	const [authenticator, bearerTokenRequestHeader] = createAuthentication(token);

	if (bearerTokenRequestHeader) {
		factories.push(bearerTokenRequestHeader);
	}

	return [factories, authenticator];
}

export function createAuthentication<A extends HasAccessToken = HasAccessToken>(
	token: string | ApiAuthenticator<A> | null
): [ApiAuthenticator<A | null>, BearerTokenRequestHeader<A>?] {
	if (token === null) {
		return [new DoNothingApiAuthenticator(), undefined];
	}

	if (typeof token === "string") {
		return [
			(new ProvidedTokenAuthenticator(token) as unknown) as ApiAuthenticator<A>,
			new BearerTokenRequestHeader(token)
		];
	}

	const bearerTokenRequestHeader = new BearerTokenRequestHeader<A>();

	return [
		new StoringApiAuthenticator(token as ApiAuthenticator<A>, bearerTokenRequestHeader),
		bearerTokenRequestHeader
	];
}
