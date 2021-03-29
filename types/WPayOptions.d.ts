/**
 * Options to configure the SDK
 */
import { ApiTokenType } from "./WPayFactory";
import { Wallet } from "./model";

export interface WPayOptions {
	/** The API key to identify the SDK to the API. */
	apiKey: string;

	/**
	 * An initial base URL for the API host to use. Is comprised of the the scheme, host, and any
	 * context root for the API paths to use eg: https://myawesomeapp.com/api
	 */
	baseUrl: string;

	accessToken?: ApiTokenType;

	/**
	 * Which wallet to interact with for everything related to payment instruments, preferences, etc.
	 * Applies across the SDK. If a different Wallet is needed, instantiate the SDK again.
	 *
	 * If not specified, will default to {@link Wallet.MERCHANT}.
	 */
	wallet?: Wallet;
}
