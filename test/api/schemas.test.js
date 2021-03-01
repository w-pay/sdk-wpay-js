"use strict";

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/schemas");

const { body, withData } = require("../matchers/request-body-matchers");
const {
	aNewMerchantSchema,
	merchantSchemaDTO,
	merchantSchemaSummariesDTO,
	merchantSchemaSummaryDTO
} = require("../data/merchant-schemas");
const {
	merchantSchemaFrom,
	merchantSchemaSummariesFrom,
	merchantSchemaSummaryFrom
} = require("../matchers/merchant-schemas-matcher");

const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("SchemasApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("list", function () {
		beforeEach(function () {
			apiClient.response = {
				data: merchantSchemaSummariesDTO(),
				meta: {}
			};
		});

		it("should set request params", async function () {
			await api.list();

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/schema"
				})
			);
		});

		it("should list schemas", async function () {
			const result = await api.list();

			assertThat(result, is(merchantSchemaSummariesFrom(apiClient.response.data)));
		});
	});

	describe("getById", function () {
		const schemaId = "abc234fer";

		beforeEach(function () {
			apiClient.response = {
				data: merchantSchemaDTO(),
				meta: {}
			};
		});

		it("should throw error if schemaId is missing", async function () {
			assertThat(() => api.getById(), throws(requiredParameterError("schemaId")));
		});

		it("should set request params", async function () {
			await api.getById(schemaId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/schema/:schemaId",
					pathParams: {
						schemaId
					}
				})
			);
		});

		it("should return schema details", async function () {
			const result = await api.getById(schemaId);

			assertThat(result, is(merchantSchemaFrom(apiClient.response.data)));
		});
	});

	describe("create", function () {
		beforeEach(function () {
			apiClient.response = {
				data: merchantSchemaSummaryDTO(),
				meta: {}
			};
		});

		it("should throw error if schema missing", function () {
			assertThat(() => api.create(), throws(requiredParameterError("schema")));
		});

		it("should set request params", async function () {
			const schema = aNewMerchantSchema();
			await api.create(schema);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/merchant/schema",
					body: is(body(withData(equalTo(schema))))
				})
			);
		});

		it("should create schema", async function () {
			const result = await api.create(aNewMerchantSchema());

			assertThat(result, is(merchantSchemaSummaryFrom(apiClient.response.data)));
		});
	});
});
