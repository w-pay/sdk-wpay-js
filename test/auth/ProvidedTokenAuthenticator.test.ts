import { equalTo, promiseThat, willBe } from "hamjest";

import { ProvidedTokenAuthenticator } from "../../src/auth";

const token = "abc123def";

describe("Provided Token Authenticator", function () {
	let authenticator: ProvidedTokenAuthenticator;

	beforeEach(function () {
		authenticator = new ProvidedTokenAuthenticator(token);
	});

	it("should return the token provided", async function () {
		await promiseThat(authenticator.authenticate(), willBe(equalTo({ accessToken: token })));
	});
});
