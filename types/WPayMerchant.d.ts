import { HttpClientFactory } from "@api-sdk-creator/http-api-client";

import { AdministrationApi } from "./WPayFactory";
import { MerchantPaymentsApi } from "./api";
import { MerchantPaymentSessionsApi } from "./api";
import { MerchantPreferencesApi } from "./api";
import { MerchantTransactionsApi } from "./api";
import { QRCodeApi } from "./api";
import { SchemasApi } from "./api";
import { WPayOptions } from "./WPayOptions";

/**
 * Factory for creating a {@link WPayMerchantApi} instance
 *
 * @param httpClient
 * @param options
 */
export function createMerchantSDK(
	httpClient: HttpClientFactory,
	options: WPayMerchantOptions
): WPayMerchantApi

/**
 * Defines the API operations that the SDK can use to call the WPay Merchant API
 *
 * The SDK is technology agnostic with applications being able to choose an implementation that
 * meets the needs and preexisting technology choices of the application.
 *
 * Implementations of the protocol may provide additional constraints on the user.
 */
export interface WPayMerchantApi {
	admin: AdministrationApi;
	payments: MerchantPaymentsApi;
	paymentSession: MerchantPaymentSessionsApi;
	preferences: MerchantPreferencesApi;
	qr: QRCodeApi;
	schemas: SchemasApi;
	transactions: MerchantTransactionsApi;

	/**
	 * Options that were given at SDK initialisation
	 */
	options: WPayOptions;
}

/**
 * Options unique to using the Merchant API operations.
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
