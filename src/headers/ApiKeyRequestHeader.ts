import { RequestHeaderFactory } from "./RequestHeaderFactory";
import { WPayOptions } from "../WPayOptions";
import { X_API_KEY } from "./HeaderNames";

/**
 * Adds the API key to the request
 *
 * @constructor
 * @param options What api key to add to the request
 */

export class ApiKeyRequestHeader implements RequestHeaderFactory {
	constructor(private readonly options: WPayOptions) {}

	addHeaders(headers: Map<string, string>): void {
		headers.set(X_API_KEY, this.options.apiKey);
	}
}
