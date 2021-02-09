import { RequestHeaderFactory } from "./RequestHeaderFactory";
import { X_WALLET_ID } from "./HeaderNames";

/**
 * Adds the Wallet ID to the request
 */
export class WalletIdRequestHeader implements RequestHeaderFactory {
	constructor(public readonly walletId: string) {

	}

	addHeaders(headers: Map<string, string>): void {
		headers.set(X_WALLET_ID, this.walletId);
	}
}
