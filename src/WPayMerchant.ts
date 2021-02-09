import { ApiAuthenticator, HasAccessToken } from "./auth";
import { ApiTokenType, createSDKComponents } from "./WPayFactory";
import { MerchantIdRequestHeader, RequestHeaderChain, RequestHeadersFactory } from "./headers";
import { WPayMerchantApiRepository } from "./WPayMerchantApiRepository";
import { WPayOptions } from "./WPayOptions";

/**
 * Options unique to using the Customer API operations.
 */
export interface WPayMerchantOptions extends WPayOptions {
	/**
	 * If given, the merchant ID will be added to the headers.
	 *
	 * Since the merchant ID identifies the merchant it can be overridden with another value by the
	 * API gateway which uses the authentication token to identify the merchant.
	 */
	merchantId?: string;
}

/**
 * Constructor function type to give to SDK factory functions to instantiate a new API repository instance.
 */
export type MerchantApiRepositoryConstructor<A extends HasAccessToken> = new (
	options: WPayMerchantOptions,
	headers: RequestHeadersFactory,
	authenticator: ApiAuthenticator<A>
) => WPayMerchantApiRepository<A>;

/**
 * Entry point into the SDK for merchants.
 *
 * @param options
 * @param token An access token or ApiAuthenticator instance for obtaining an access token, or null.
 * @param Repository A constructor function to create a new API repository instance.
 */
export function createMerchantSDK<A extends HasAccessToken = HasAccessToken>(
	options: WPayMerchantOptions,
	token: ApiTokenType<A>,
	Repository: MerchantApiRepositoryConstructor<A>
): WPayMerchantApiRepository<A> {
	const [headers, authenticator] = createSDKComponents(options, token);

	if (options.merchantId) {
		headers.push(new MerchantIdRequestHeader(options.merchantId));
	}

	return new Repository(
		options,
		new RequestHeaderChain(headers),
		authenticator as ApiAuthenticator<A>
	);
}
