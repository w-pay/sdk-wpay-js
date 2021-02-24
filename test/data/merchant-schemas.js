"use strict";

const { v4: uuid } = require("uuid");

const aNewMerchantSchema = () => ({
	schema: {
		key: "value"
	},
	type: "pos",
	description: "my new schema"
})

const merchantSchemaDTO = () => ({
	...aNewMerchantSchema(),
	created: "2021-02-17T06:31:46.358Z"
})

const merchantSchemaSummariesDTO = () => ({
	schemas: [ merchantSchemaSummaryDTO() ]
})

const merchantSchemaSummaryDTO = () => ({
	schemaId: uuid(),
	type: "pos",
	description: "a very important schema",
	created: "2021-02-17T06:31:46.358Z"
});

module.exports = {
	aNewMerchantSchema,
	merchantSchemaDTO,
	merchantSchemaSummariesDTO,
	merchantSchemaSummaryDTO
}
