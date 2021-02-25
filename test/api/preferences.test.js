"use strict";

const { assertThat, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { body, withData } = require("../matchers/request-body-matchers");
const { preferences, preferencesDTO } = require("../data/preferences");
const { preferencesDTOFrom, preferencesFrom } = require("../matchers/preferences-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

const apiDefs = [
	{
		name: "CustomerPreferencesApi",
		apiFactory: require("../../src/api/customer-preferences"),
		url: "/customer/preferences"
	},
	{
		name: "MerchantPreferencesApi",
		apiFactory: require("../../src/api/merchant-preferences"),
		url: "/merchant/preferences"
	}
];

describe("Preferences Apis", function () {
	apiDefs.forEach((apiDef) => {
		describe(`${apiDef.name}`, function () {
			let apiClient;

			let api;

			beforeEach(function () {
				apiClient = new StubApiClient();

				api = apiDef.apiFactory(apiClient.client());
			});

			describe("getPreferences", function () {
				beforeEach(function () {
					apiClient.response = {
						data: preferencesDTO(),
						meta: {}
					};
				});

				it("should set request params", async function () {
					await api.get();

					assertThat(
						apiClient.request,
						is({
							method: HttpRequestMethod.GET,
							url: apiDef.url
						})
					);
				});

				it("should get preferences", async function () {
					const result = await api.get();

					assertThat(result, is(preferencesFrom(apiClient.response.data)));
				});
			});

			describe("setPreferences", function () {
				it("should throw error if preferences missing", function () {
					assertThat(() => api.set(), throws(requiredParameterError("preferences")));
				});

				it("should set request params", async function () {
					const prefs = preferences();
					await api.set(prefs);

					assertThat(
						apiClient.request,
						hasProperties({
							method: HttpRequestMethod.POST,
							url: apiDef.url,
							body: is(body(withData(preferencesDTOFrom(prefs))))
						})
					);
				});
			});
		});
	});
});
