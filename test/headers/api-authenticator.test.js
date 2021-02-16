"use strict";

const { promiseThat, willBe } = require("hamjest");

const { toApiAuthenticator } = require("../../src/headers/api-authenticator");

describe("Api Authenticator", function() {
	it("should convert string to ApiAuthenticator", async function() {
		const token = "abc123";

		const result = toApiAuthenticator(token);

		await promiseThat(result.authenticate(), willBe(token));
	});

	it("should use existing ApiAuthenticator", async function() {
		const token = "abc123"

		const result = toApiAuthenticator({
			authenticate: () => Promise.resolve(token)
		});

		await promiseThat(result.authenticate(), willBe(token));
	});

	it("should create ApiAuthenticator that returns nothing when used when no token given",
		async function() {
			const result = toApiAuthenticator();

			await promiseThat(result.authenticate(), willBe(""));
		});

	it("should create ApiAuthenticator that returns nothing when used when null token given",
		async function() {
			const result = toApiAuthenticator(null);

			await promiseThat(result.authenticate(), willBe(""));
		});
});
