/**
 * Options to configure the SDK
 */
export interface WPayOptions {
	/** The API key to identify the SDK to the API. */
	apiKey: string;

	/**
	 * An initial base URL for the API host to use. Is comprised of the the scheme, host, and any
	 * context root for the API paths to use eg: https://myawesomeapp.com/api
	 */
	baseUrl: string;
}
