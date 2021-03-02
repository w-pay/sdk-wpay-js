"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");

const { assertThat, instanceOf, is, throws } = require("hamjest");

const { createApiClient } = require("../src/wpay-factory");

const { StubHttpClient } = require("./stub-http-client");

const config = {
	apiKey: "abc123",
	baseUrl: "http://foo.com"
};

describe("WPay Factory", function () {
	let httpClient;
	let factory;

	beforeEach(function () {
		httpClient = new StubHttpClient();

		factory = createApiClient(httpClient.factory());
	});

	describe("createApiClient", function () {
		it("should throw when default headers can't be created", function () {
			assertThat(() => factory({}), throws(instanceOf(Error)));
		});

		it("should resolve url to baseUrl config", async function () {
			const path = "/foo/bar";

			await asyncToPromise(
				factory(config)({
					url: path
				})
			);

			assertThat(httpClient.request.url, is("http://foo.com/foo/bar"));
		});
	});
});
