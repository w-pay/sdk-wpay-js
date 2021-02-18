const { assertThat, defined, hasProperty, not } = require("hamjest");

const { createCustomerSDK, X_WALLET_ID } = require("../src");

const { StubHttpClient } = require("./stub-http-client");

const options = {
	apiKey: "123abc456",
	baseUrl: "/"
};

describe("WPay Customer", function () {
	let stubHttpClient;

	beforeEach(function() {
		stubHttpClient = new StubHttpClient();

		stubHttpClient.response.body = JSON.stringify({
			data: {
				healthCheck: "success"
			},
			meta: {}
		})
	});

	it("should not add wallet id header when no id given", async function () {
		const sdk = createCustomerSDK(stubHttpClient.factory(), options);

		await sdk.admin.checkHealth();

		assertThat(stubHttpClient.request.headers, hasProperty(X_WALLET_ID, not(defined())));
	});

	it("should add wallet id header when id given", async function() {
		const sdk = createCustomerSDK(
			stubHttpClient.factory(),
			{ ...options, walletId: "1234567" }
		)

		await sdk.admin.checkHealth();

		assertThat(stubHttpClient.request.headers, hasProperty(X_WALLET_ID, defined()));
	});
});
