import { HttpClientFactory } from "@sdk-creator/http-api-client";

import { AdministrationApi } from "./api";
import { CustomerPaymentRequestsRepository } from "./api";
import { CustomerPaymentSessionsRepository } from "./api";
import { CustomerPreferencesRepository } from "./api";
import { CustomerTransactionsRepository } from "./api";
import { PaymentInstrumentsRepository } from "./api";
import { WPayOptions } from "./WPayOptions";

/**
 * Factory for creating a {@link WPayCustomerApi} instance
 *
 * @param httpClient
 * @param options
 */
export function createCustomerSDK(
	httpClient: HttpClientFactory,
	options: WPayCustomerOptions
): WPayCustomerApi

/**
 * Defines the API operations that the SDK can use to call the WPay Customer API
 *
 * The SDK is technology agnostic with applications being able to choose an implementation that
 * meets the needs and preexisting technology choices of the application.
 *
 * Implementations of the protocol may provide additional constraints on the user.
 */
export interface WPayCustomerApi {
	admin: AdministrationApi;
	instruments: PaymentInstrumentsRepository;
	paymentRequests: CustomerPaymentRequestsRepository;
	paymentSessions: CustomerPaymentSessionsRepository;
	preferences: CustomerPreferencesRepository;
	transactions: CustomerTransactionsRepository;

	/**
	 * Options that were given at SDK initialisation
	 */
	options: WPayOptions;
}

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
