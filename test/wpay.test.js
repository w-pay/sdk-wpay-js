const { assertThat, defined, hasProperty, not } = require("hamjest");

const { createCustomerSDK, createMerchantSDK, X_API_KEY } = require("../src");

const { StubHttpClient } = require("./stub-http-client");

const options = {
	apiKey: "123abc456",
	baseUrl: "/"
};

const AUTHORISATION = "authorization";

const sdks = [
	{
		name: "WPay Customer",
		factory: createCustomerSDK
	},
	{
		name: "WPay Merchant",
		factory: createMerchantSDK
	}
];

describe("WPay SDKs", function () {
	let stubHttpClient;

	beforeEach(function() {
		stubHttpClient = new StubHttpClient();
	});

	sdks.forEach((sdk) => {
		const { factory } = sdk;

		describe(`${sdk.name}`, function () {
			it("should pass needed request headers in request", async function () {
				const sdk = factory(stubHttpClient.factory(), { ...options, accessToken: "abc123" });
				await sdk.admin.checkHealth();

				const request = stubHttpClient.request;

				// we just care the headers are defined. As for what goes in the headers that is up to the
				// tests of the individual RequestHeaderFactory instances.
				assertThat(request.headers, hasProperty(X_API_KEY, defined()));
				assertThat(request.headers, hasProperty(AUTHORISATION, defined()));
			});

			// for unauthenticated endpoints
			it("should omit authorisation if no token provided", async function () {
				const sdk = factory(stubHttpClient.factory(), options);
				await sdk.admin.checkHealth();

				assertThat(stubHttpClient.request.headers, not(hasProperty(AUTHORISATION)));
			});
		});
	});
});
