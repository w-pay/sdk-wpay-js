import { assertThat, is } from "hamjest";

import { MerchantIdRequestHeader, X_MERCHANT_ID } from "../../src/headers";

describe("MerchantId Request Header", function() {
	let headers: Map<string, string>;

	beforeEach(function () {
		headers = new Map<string, string>();
	});

	it("should add merchant ID to headers", function() {
		const merchantId = "134848384";

		const header = new MerchantIdRequestHeader(merchantId);
		header.addHeaders(headers);

		assertThat(headers.get(X_MERCHANT_ID), is(merchantId));
	})
});
