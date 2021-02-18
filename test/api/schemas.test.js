"use strict";

const { assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const apiFactory = require("../../src/api/schemas");

const {
	merchantSchema,
	merchantSchemaSummaries,
	merchantSchemaSummary
} = require("../matchers/merchant-schemas-matcher");

const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("SchemasApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	})

	describe("list", function() {
		beforeEach(function() {
			apiClient.response = {
				data: {
					schemas: [
						{
							type: "pos",
							schemaId: "bf3c82b9-1dee-406c-906e-7d594a501fa2",
							description: "POS information to be provided",
							created: "2020-11-27T08:01:35.681Z"
						}
					]
				},
				meta: {}
			}
		})

		it("should set request params", async function() {
			await api.list();

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/schema"
			}))
		});

		it("should list schemas", async function() {
			const result = await api.list();

			assertThat(result, is(merchantSchemaSummaries()));
		});
	});

	describe("getById", function() {
		const schemaId = "abc234fer";

		beforeEach(function() {
			apiClient.response = {
				data: {
					type: "pos",
					schema: {},
					description: "POS information to be provided",
					created: "2020-11-27T08:01:35.681Z"
				},
				meta: {}
			}
		})

		it("should throw error if schemaId is missing", async function() {
			assertThat(() => api.getById(), throws(requiredParameterError("schemaId")))
		});

		it("should set request params", async function() {
			await api.getById(schemaId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/schema/:schemaId",
				pathParams: {
					schemaId
				}
			}))
		});

		it("should return schema details", async function() {
			const result = await api.getById(schemaId);

			assertThat(result, is(merchantSchema()));
		});
	});

	describe("create", function() {
		const schema = {
			type: "pos",
			schema: {},
			description: "POS information to be provided",
		}

		beforeEach(function() {
			apiClient.response = {
				data: {
					type: "pos",
					schemaId: "bf3c82b9-1dee-406c-906e-7d594a501fa2",
					description: "POS information to be provided",
					created: "2020-11-27T08:01:35.681Z"
				},
				meta: {}
			}
		})

		it("should throw error if schema missing", function() {
			assertThat(() => api.create(), throws(requiredParameterError("schema")));
		});

		it("should set request params", async function() {
			await api.create(schema);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.POST,
				url: "/merchant/schema",
				body: {
					data: {
						schema
					},
					meta: {}
				}
			}))
		});

		it("should create schema", async function() {
			const result = await api.create(schema);

			assertThat(result, is(merchantSchemaSummary()))
		});
	});
});
