"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromMerchantSchemaDTO,
	fromMerchantSchemaSummariesDTO,
	fromMerchantSchemaSummaryDTO,
	toNewMerchantSchemaDTO
} = require("../../src/transformers/merchant-schemas");

const {
	aNewMerchantSchema,
	merchantSchemaDTO,
	merchantSchemaSummariesDTO,
	merchantSchemaSummaryDTO
} = require("../data/merchant-schemas");
const {
	merchantSchemaFrom,
	merchantSchemaSummariesFrom,
	merchantSchemaSummaryFrom,
	newMerchantSchemaDTOFrom
} = require("../matchers/merchant-schemas-matcher");

describe("Merchant Schemas Transformers", function () {
	describe("MerchantSchemaSummaries", function () {
		describe("from DTO", function () {
			it("should convert from DTO", function () {
				const dto = merchantSchemaSummariesDTO();

				assertThat(fromMerchantSchemaSummariesDTO(dto), is(merchantSchemaSummariesFrom(dto)));
			});
		});
	});

	describe("MerchantSchemaSummary", function () {
		describe("from DTO", function () {
			it("should convert from DTO", function () {
				const dto = merchantSchemaSummaryDTO();

				assertThat(fromMerchantSchemaSummaryDTO(dto), is(merchantSchemaSummaryFrom(dto)));
			});
		});
	});

	describe("MerchantSchema", function () {
		describe("from DTO", function () {
			it("should convert from DTO", function () {
				const dto = merchantSchemaDTO();

				assertThat(fromMerchantSchemaDTO(dto), is(merchantSchemaFrom(dto)));
			});
		});
	});

	describe("NewMerchantSchema", function () {
		describe("to DTO", function () {
			it("should convert to DTO", function () {
				const schema = aNewMerchantSchema();

				assertThat(toNewMerchantSchemaDTO(schema), is(newMerchantSchemaDTOFrom(schema)));
			});
		});
	});
});
