"use strict";

const { assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

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
]

describe("Preferences Apis", function() {
	apiDefs.forEach((apiDef) => {
		describe(`${apiDef.name}`, function() {
			let apiClient;

			let api;

			beforeEach(function() {
				apiClient = new StubApiClient()

				api = apiDef.apiFactory(apiClient.client());
			});

			describe("getPreferences", function() {
				beforeEach(function() {
					apiClient.response = {
						data: {
							payments: {},
							preferenceGroup: {
								preference: "preference value"
							}
						},
						meta: {}
					}
				});

				it("should set request params", async function() {
					await api.get();

					assertThat(apiClient.request, is({
						method: HttpRequestMethod.GET,
						url: apiDef.url
					}));
				});

				it("should get preferences", async function() {
					/** @type Map */
					const result = await api.get();

					assertThat(result.has("payments"), is(true));
					assertThat(result.has("preferenceGroup"), is(true));

					const payments = result.get("preferenceGroup");
					assertThat(payments.get("preference"), is("preference value"));
				});
			});

			describe("setPreferences", function() {
				let preferences;

				beforeEach(function() {
					const preferenceGroup = new Map();
					preferenceGroup.set("preference", "value");

					preferences = new Map();
					preferences.set("preferenceGroup", preferenceGroup);
				})

				it("should throw error if preferences missing", function() {
					assertThat(() => api.set(), throws(requiredParameterError("preferences")));
				});

				it("should set request params", async function() {
					await api.set(preferences);

					assertThat(apiClient.request, is({
						method: HttpRequestMethod.POST,
						url: apiDef.url,
						body: {
							data: {
								preferenceGroup: {
									preference: "value"
								}
							},
							meta: {}
						}
					}));
				});
			});
		});
	});
});
