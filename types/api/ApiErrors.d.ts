/**
 * Base exception type. Used when no other error type is appropriate.
 */
export class ApiException extends Error {}

/**
 * Throw when there is an error parsing JSON data
 */
export class JsonParsingException extends ApiException {
	/** @var details Additional details about why the parsing failed. Is implementation specific. */
	public readonly details?: Map<string, any>;

	constructor(message: string, details?: Map<string, any>);
}

/**
 * Thrown when the server returns an HTTP error
 */
export class HttpErrorException extends ApiException {
	public readonly statusCode: number;
	public readonly responseHeaders: Map<string, string[]>;
	public readonly responseBody: string;

	constructor(statusCode: number, responseHeaders: Map<string, string[]>, responseBody: string);
}
