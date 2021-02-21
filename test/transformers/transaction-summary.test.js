"use strict";

const { assertThat, instanceOf, is } = require("hamjest");

const { fromTransactionSummaryDTO } = require("../../src/transformers/transaction-summary");

describe("Transaction Summary transformers", function () {
	describe("from DTO", function () {
		const dto = {
			type: "payment",
			status: "processing",
			executionTime: "2021-02-17T06:31:46.358Z"
		};

		it("should ensure case of 'type'", function () {
			const summary = fromTransactionSummaryDTO(dto);

			assertThat(summary.type, is("PAYMENT"));
		});

		it("should ensure case of 'status'", function () {
			const summary = fromTransactionSummaryDTO(dto);

			assertThat(summary.status, is("PROCESSING"));
		});

		it("should parse date", function() {
			const summary = fromTransactionSummaryDTO(dto);

			assertThat(summary.executionTime, instanceOf(Date));
		})
	});
});
