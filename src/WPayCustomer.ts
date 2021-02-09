import { ApiAuthenticator, HasAccessToken } from "./auth";
import { ApiTokenType, createSDKComponents } from "./WPayFactory";
import { RequestHeaderChain, RequestHeadersFactory, WalletIdRequestHeader } from "./headers";
import { WPayCustomerApiRepository } from "./WPayCustomerApiRepository";
import { WPayOptions } from "./WPayOptions";

/**
 * Options unique to using the Customer API operations.
 */
export interface WPayCustomerOptions extends WPayOptions {
	/**
	 * If given, the wallet ID will be added to the headers.
	 *
	 * Since the wallet ID identifies the customer it can be overridden with another value by the
	 * API gateway which uses the authentication token to identify the customer.
	 */
	walletId?: string;
}

/**
 * Constructor function type to give to SDK factory functions to instantiate a new API repository instance.
 */
export type CustomerApiRepositoryConstructor<A extends HasAccessToken> = new (
	options: WPayCustomerOptions,
	headers: RequestHeadersFactory,
	authenticator: ApiAuthenticator<A>
) => WPayCustomerApiRepository<A>;

/**
 * Entry point into the SDK for customers.
 *
 * @param options
 * @param token An access token or ApiAuthenticator instance for obtaining an access token, or null.
 * @param Repository A constructor function to create a new API repository instance.
 */
export function createCustomerSDK<A extends HasAccessToken = HasAccessToken>(
	options: WPayCustomerOptions,
	token: ApiTokenType<A>,
	Repository: CustomerApiRepositoryConstructor<A>
): WPayCustomerApiRepository<A> {
	const [headers, authenticator] = createSDKComponents(options, token);

	if (options.walletId) {
		headers.push(new WalletIdRequestHeader(options.walletId));
	}

	return new Repository(
		options,
		new RequestHeaderChain(headers),
		authenticator as ApiAuthenticator<A>
	);
}
