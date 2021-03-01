"use strict";

const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const {
	acceptTermsAndConditionsRequest,
	termsAndConditionsDTO
} = require("../data/terms-and-conditions");
const {
	termsAndConditionsAcceptancesDTOFrom
} = require("../matchers/terms-and-conditions-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

const apiFactory = require("../../src/api/customer-terms-and-conditions");

describe("Terms and Conditions Apis", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("get", function () {
		beforeEach(function () {
			apiClient.response = {
				data: termsAndConditionsDTO(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.get();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/customer/termsandconditions/acceptance"
				})
			);
		});

		it("should get terms and conditions acceptances", async function () {
			const result = await api.get();

			assertThat(result, is(termsAndConditionsAcceptancesDTOFrom(apiClient.response.data)));
		});
	});

	describe("accept", function () {
		it("should throw error if acceptTermsAndConditionsRequest is missing", function () {
			assertThat(
				() => api.accept(),
				throws(requiredParameterError("acceptTermsAndConditionsRequest"))
			);
		});

		it("should set request params", async function () {
			const request = acceptTermsAndConditionsRequest();

			await api.accept(request);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/customer/termsandconditions/acceptance",
					body: request
				})
			);
		});
	});
});
