import { RequestHeaderFactory } from "./RequestHeaderFactory";
import { X_MERCHANT_ID } from "./HeaderNames";

/**
 * Adds the Merchant ID to the request
 */
export class MerchantIdRequestHeader implements RequestHeaderFactory {
	constructor(public readonly merchantId: string) {}

	addHeaders(headers: Map<string, string>): void {
		headers.set(X_MERCHANT_ID, this.merchantId);
	}
}
