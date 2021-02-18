"use strict";

const { assertThat, instanceOf } = require("hamjest");

const { fromSchemaDTO } = require("../../src/transformers/schemas");

describe("Schema transformers", function () {
	describe("from DTO", function() {
		const dto = {
			created: "2021-02-17T06:31:46.358Z"
		};

		it("should convert created date", function() {
			const result = fromSchemaDTO(dto);

			assertThat(result.created, instanceOf(Date));
		});
	});
});
