/**
 * Creates a Map of headers to be added to HTTP requests
 */
export interface RequestHeadersFactory {
	/**
	 * @return A Map of headers to be added to HTTP requests
	 */
	createHeaders(): Map<string, string>;
}
