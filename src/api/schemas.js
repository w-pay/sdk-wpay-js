"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const { getPropOrError } = require("../helpers/props");
const { fromSchemaDTO } = require("../transformers/schemas");
const { requiredParameterError } = require("./api-errors");

const list = (client) => () =>
	pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(mapProps({
				schemas: map(fromSchemaDTO)
			})),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/schema"
	});

const getById = (client) => (schemaId) => {
	if (!schemaId) {
		throw requiredParameterError("schemaId")
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromSchemaDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/merchant/schema/:schemaId",
		pathParams: {
			schemaId
		}
	})
};

const create = (client) => (schema) => {
	if (!schema) {
		throw requiredParameterError("schema")
	}

	return pipe(
		client,
		chain(pipe(
			getPropOrError("data"),
			map(fromSchemaDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/merchant/schema",
		body: {
			data: {
				schema
			},
			meta: {}
		}
	})
};

module.exports = (client) => {
	/** @implements {import('../../types/api/Schemas').SchemasApi} */
	return {
		list: list(client),
		getById: getById(client),
		create: create(client)
	};
}
