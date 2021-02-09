import { assertThat, is } from "hamjest";

import { WalletIdRequestHeader, X_WALLET_ID } from "../../src/headers";

describe("WalletId Request Header", function () {
	let headers: Map<string, string>;

	beforeEach(function () {
		headers = new Map<string, string>();
	});

	it("should add wallet ID to headers", function () {
		const walletId = "123958383";

		const header = new WalletIdRequestHeader(walletId);
		header.addHeaders(headers);

		assertThat(headers.get(X_WALLET_ID), is(walletId));
	});
});
