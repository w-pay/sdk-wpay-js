"use strict";

const { assertThat, is } = require("hamjest");

const { fromHealthCheckDTO } = require("../../src/transformers/health-check");

const { healthCheckDTO } = require("../data/health-check");
const { healthCheckFrom } = require("../matchers/health-check-matchers");

describe("Health Check Transformer", function () {
	describe("from DTO", function () {
		it("should convert dto", function () {
			const dto = healthCheckDTO();

			assertThat(fromHealthCheckDTO(dto), is(healthCheckFrom(dto)));
		});
	});
});
