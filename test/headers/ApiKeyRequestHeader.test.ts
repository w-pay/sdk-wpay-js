import { assertThat, is } from "hamjest";

import { ApiKeyRequestHeader, X_API_KEY } from "../../src/headers";
import { WPayOptions } from "../../src";

const options: WPayOptions = {
	apiKey: "abc123def",
	baseUrl: "/"
};

describe("Api Key Request Header", function () {
	let factory: ApiKeyRequestHeader;
	let headers: Map<string, string>;

	beforeEach(function () {
		factory = new ApiKeyRequestHeader(options);
		headers = new Map<string, string>();
	});

	it("should add API key", function () {
		factory.addHeaders(headers);

		assertThat(headers.get(X_API_KEY), is(options.apiKey));
	});
});
