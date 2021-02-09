import { RequestHeadersFactory } from "./RequestHeadersFactory";
import { RequestHeaderFactory } from "./RequestHeaderFactory";

/**
 * A {@link RequestHeadersFactory} that populates the HTTP request headers Map using a list of {@link RequestHeaderFactory}s
 *
 * @constructor
 * @param factories The list of {@link RequestHeaderFactory}s to use.
 */
export class RequestHeaderChain implements RequestHeadersFactory {
	constructor(private readonly factories: RequestHeaderFactory[]) {}

	createHeaders(): Map<string, string> {
		const headers = new Map<string, string>();

		this.factories.forEach((factory) => {
			factory.addHeaders(headers);
		});

		return headers;
	}
}
