"use strict";

const { asyncToPromise, unsetProp } = require("crocks");

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
			assertThat(() => factory(unsetProp("apiKey", config)), throws(instanceOf(Error)));
		});

		it("should throw error when baseUrl not set", function () {
			assertThat(() => factory(unsetProp("baseUrl", config)), throws(instanceOf(Error)));
		});

		it("should resolve url to baseUrl config", async function () {
			const path = "/foo/bar";

			await asyncToPromise(
				factory(config)({
					url: path
				})
			);

			assertThat(httpClient.request.url, is(`${config.baseUrl}/foo/bar`));
		});
	});
});
