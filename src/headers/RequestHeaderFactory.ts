/**
 * Abstracts how HTTP headers are added to a Map.
 */
export interface RequestHeaderFactory {
	/**
	 * Adds a name and value to a Map of HTTP request headers
	 *
	 * @param headers A Map of HTTP request headers
	 */
	addHeaders(headers: Map<string, string>): void;
}
