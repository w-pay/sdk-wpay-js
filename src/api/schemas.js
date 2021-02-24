"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const pipeK = require("crocks/helpers/pipeK");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { fromData } = require("../transformers/data");
const {
	fromMerchantSchemaDTO,
	fromMerchantSchemaSummariesDTO,
	fromMerchantSchemaSummaryDTO
} = require("../transformers/merchant-schemas");
const { requiredParameterError } = require("./api-errors");

const list = (client) => () =>
	asyncToPromise(pipeK(
		client,
		fromData(fromMerchantSchemaSummariesDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/schema"
	}));

const getById = (client) => (schemaId) => {
	if (!schemaId) {
		throw requiredParameterError("schemaId")
	}

	return asyncToPromise(pipeK(
		client,
		fromData(fromMerchantSchemaDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/schema/:schemaId",
		pathParams: {
			schemaId
		}
	}))
};

const create = (client) => (schema) => {
	if (!schema) {
		throw requiredParameterError("schema")
	}

	return asyncToPromise(pipeK(
		client,
		fromData(fromMerchantSchemaSummaryDTO)
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/schema",
		body: {
			data: schema,
			meta: {}
		}
	}))
};

module.exports = (client) => {
	/** @implements {import('../../types/api/Schemas').SchemasApi} */
	return {
		list: list(client),
		getById: getById(client),
		create: create(client)
	};
}
