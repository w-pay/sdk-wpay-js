import { assertThat, instanceOf, is, throws } from "hamjest";

import { BearerTokenRequestHeader } from "../../src/headers";
import { HasAccessToken } from "../../src/auth";

describe("Bearer Token Request Header", function () {
	let factory: BearerTokenRequestHeader<HasAccessToken>;
	let headers: Map<string, string>;

	beforeEach(function () {
		factory = new BearerTokenRequestHeader<HasAccessToken>();

		headers = new Map();
	});

	it("should throw error if access token is not set", function () {
		assertThat(() => factory.addHeaders(headers), throws(instanceOf(Error)));
	});

	it("should store and use access token", function () {
		const token = "abc123def";

		factory.storeCredentials({ accessToken: token });
		factory.addHeaders(headers);

		assertThat(headers.get("Authorization"), is(`Bearer ${token}`));
	});
});
