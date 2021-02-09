import { assertThat, defined, is, not } from "hamjest";

import { createCustomerSDK, WPayOptions, X_WALLET_ID } from "../src";

import { StubWPayCustomerApiRepository } from "./ApiRepositoryStubs";

const options: WPayOptions = {
	apiKey: "123abc456",
	baseUrl: "/"
};

describe("WPay Customer", function () {
	it("should not add wallet id header when no id given", function () {
		const sdk = createCustomerSDK(
			options,
			"abc123",
			StubWPayCustomerApiRepository
		) as StubWPayCustomerApiRepository;

		const headers = sdk.headers.createHeaders();

		assertThat(headers.get(X_WALLET_ID), is(not(defined())));
	});

	it("should add wallet id header when id given", function() {
		const sdk = createCustomerSDK(
			{ ...options, walletId: "1234567" },
			"abc123",
			StubWPayCustomerApiRepository
		) as StubWPayCustomerApiRepository;

		const headers = sdk.headers.createHeaders();

		assertThat(headers.get(X_WALLET_ID), is(defined()));
	});
});
