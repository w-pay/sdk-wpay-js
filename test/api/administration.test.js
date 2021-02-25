"use strict";

const { assertThat, is } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/administration");

const { healthCheckDTO } = require("../data/health-check");
const { healthCheckFrom } = require("../matchers/health-check-matchers");
const { StubApiClient } = require("../stub-api-client");

describe("AdministrationApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());

		apiClient.response = {
			data: healthCheckDTO(),
			meta: {}
		};
	});

	it("should set request params", async function () {
		await api.checkHealth();

		const request = apiClient.request;
		assertThat(request.method, is(HttpRequestMethod.GET));
		assertThat(request.url, is("/"));
	});

	it("should return HealthCheck", async function () {
		const result = await api.checkHealth();

		assertThat(result, is(healthCheckFrom(healthCheckDTO())));
	});
});
