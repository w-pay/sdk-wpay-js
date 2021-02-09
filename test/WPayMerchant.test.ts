import { assertThat, defined, is, not } from "hamjest";

import { createMerchantSDK, WPayOptions, X_MERCHANT_ID, X_WALLET_ID } from "../src";

import { StubWPayMerchantApiRepository } from "./ApiRepositoryStubs";

const options: WPayOptions = {
	apiKey: "123abc456",
	baseUrl: "/"
};

describe("WPay Merchant", function () {
	it("should not add merchant id header when no id given", function () {
		const sdk = createMerchantSDK(
			options,
			"abc123",
			StubWPayMerchantApiRepository
		) as StubWPayMerchantApiRepository;

		const headers = sdk.headers.createHeaders();

		assertThat(headers.get(X_WALLET_ID), is(not(defined())));
	});

	it("should add merchant id header when id given", function () {
		const sdk = createMerchantSDK(
			{ ...options, merchantId: "12345465" },
			"abc123",
			StubWPayMerchantApiRepository
		) as StubWPayMerchantApiRepository;

		const headers = sdk.headers.createHeaders();

		assertThat(headers.get(X_MERCHANT_ID), is(defined()));
	});
});
