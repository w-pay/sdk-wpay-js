const { assertThat, defined, hasProperty, not } = require("hamjest");

const { createMerchantSDK, X_MERCHANT_ID } = require("../src");

const { StubHttpClient } = require("./stub-http-client");

const options = {
	apiKey: "123abc456",
	baseUrl: "/"
};

describe("WPay Merchant", function () {
	let stubHttpClient;

	beforeEach(function() {
		stubHttpClient = new StubHttpClient();
	});

	it("should not add merchant id header when no id given", async function () {
		const sdk = createMerchantSDK(stubHttpClient.factory(), options);

		await sdk.admin.checkHealth();

		assertThat(stubHttpClient.request.headers, hasProperty(X_MERCHANT_ID, not(defined())));
	});

	it("should add merchant id header when id given", async function () {
		const sdk = createMerchantSDK(
			stubHttpClient.factory(),
			{ ...options, merchantId: "12345465" }
		);

		await sdk.admin.checkHealth();

		assertThat(stubHttpClient.request.headers, hasProperty(X_MERCHANT_ID, defined()));
	});
});
