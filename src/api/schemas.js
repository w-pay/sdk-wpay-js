"use strict";

const list = (client) => () => Promise.resolve();

const getById = (client, schemaId) => Promise.resolve();

const create = (client, schema) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/Schemas').SchemasApi} */
	return {
		list: list(client),
		getById: getById(client),
		create: create(client)
	};
}
