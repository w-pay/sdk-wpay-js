"use strict";

const Async = require("crocks/Async");

const {
	allOf,
	assertThat,
	containsString,
	equalTo,
	hasProperty,
	instanceOf,
	isRejectedWith,
	not,
	promiseThat
} = require("hamjest");

const { defaultHeaders, X_API_KEY, X_MERCHANT_ID, X_WALLET_ID } = require("../../src/headers");

const AUTHORISATION = "authorization";

describe("default headers", function () {
	let headers;

	it("should reject when missing apiKey", async function () {
		await promiseThat(
			getHeaders({}),
			isRejectedWith(allOf(instanceOf(Error), hasProperty("message", containsString("apiKey"))))
		);
	});

	it("should add apiKey header", async function () {
		const apiKey = "abc123";

		headers = await getHeaders({ apiKey, walletId: "foo" });

		assertThat(headers, hasProperty(X_API_KEY, equalTo(apiKey)));
	});

	describe("bearer token", function () {
		it("should add authorisation header from string token", async function () {
			const accessToken = "abc123def456";

			headers = await getHeaders({ apiKey: "abc123", accessToken });

			assertThat(headers, hasProperty(AUTHORISATION, equalTo(`Bearer ${accessToken}`)));
		});

		it("should add authorisation header from ApiAuthenticator", async function () {
			const accessToken = "abc123def456";

			headers = await getHeaders({
				apiKey: "abc123",
				accessToken: {
					authenticate: () => Promise.resolve(accessToken)
				}
			});

			assertThat(headers, hasProperty(AUTHORISATION, equalTo(`Bearer ${accessToken}`)));
		});

		it("should ignore missing access token", async function () {
			headers = await getHeaders({ apiKey: "abc123" });

			assertThat(headers, not(hasProperty(AUTHORISATION)));
		});

		it("should ignore null access token", async function () {
			headers = await getHeaders({ apiKey: "abc123", accessToken: null });

			assertThat(headers, not(hasProperty(AUTHORISATION)));
		});
	});

	describe("optional headers", function () {
		const optionalHeaders = [
			{ prop: "merchantId", header: X_MERCHANT_ID },
			{ prop: "walletId", header: X_WALLET_ID }
		];

		optionalHeaders.forEach((option) => {
			it(`should add ${option.prop} header`, async function () {
				const value = "some value";

				headers = await getHeaders({ apiKey: "abc123", [option.prop]: value });

				assertThat(headers, hasProperty(option.header, equalTo(value)));
			});

			it(`should not add missing ${option.prop} header`, async function () {
				headers = await getHeaders({ apiKey: "abc123" });

				assertThat(headers, not(hasProperty(option.header)));
			});
		});
	});

	function getHeaders(opts) {
		return defaultHeaders(opts)
			.either(Async.Rejected, (fn) => fn())
			.toPromise();
	}
});
