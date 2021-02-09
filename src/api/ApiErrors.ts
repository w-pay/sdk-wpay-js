/**
 * Base exception type. Used when no other error type is appropriate.
 */
export class ApiException extends Error {}

/**
 * Throw when there is an error parsing JSON data
 */
export class JsonParsingException extends ApiException {
	constructor(
		message: string,
		/** @var details Additional details about why the parsing failed. Is implementation specific. */
		public readonly details?: Map<string, any>
	) {
		super(message);
	}
}

/**
 * Thrown when the server returns an HTTP error
 */
export class HttpErrorException extends ApiException {
	constructor(
		public readonly statusCode: number,
		public readonly responseHeaders: Map<string, string[]>,
		public readonly responseBody: string
	) {
		super(
			(function () {
				switch (statusCode) {
					case 400:
						return "Invalid Input";
					case 401:
						return "Unauthorized";
					case 422:
						return "Processing Error";
					default:
						return "Server Error";
				}
			})()
		);
	}
}
