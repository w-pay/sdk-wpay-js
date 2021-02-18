"use strict";

const { assertThat, equalTo, hasProperty, is } = require("hamjest");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const apiFactory = require("../../src/api/administration");

const { StubApiClient } = require("../stub-api-client");

describe("AdministrationApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());

		apiClient.response = {
			data: {
				healthCheck: "success"
			},
			meta: {}
		}
	})

	it("should set request params", async function() {
		await api.checkHealth();

		const request = apiClient.request;
		assertThat(request.method, is(HttpRequestMethod.GET));
		assertThat(request.url, is("/"));
	});

	it("should return HealthCheck", async function() {
		const result = await api.checkHealth();

		assertThat(result, hasProperty("result", equalTo("SUCCESS")));
	});
});
