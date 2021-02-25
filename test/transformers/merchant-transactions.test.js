"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromMerchantTransactionDetailsDTO,
	fromMerchantTransactionSummariesDTO,
	fromMerchantTransactionSummaryDTO
} = require("../../src/transformers/merchant-transactions");

const {
	merchantTransactionDetailsDTO,
	merchantTransactionSummariesDTO,
	merchantTransactionSummaryDTO
} = require("../data/merchant-transactions");
const {
	merchantTransactionDetailsFrom,
	merchantTransactionSummaryFrom,
	merchantTransactionSummariesFrom
} = require("../matchers/merchant-transaction-matchers");

describe("Merchant Transactions Transformers", function () {
	describe("MerchantransactionSummaries", function () {
		describe("from DTO", function () {
			it("should convert dto", function () {
				const dto = merchantTransactionSummariesDTO();

				assertThat(
					fromMerchantTransactionSummariesDTO(dto),
					is(merchantTransactionSummariesFrom(dto))
				);
			});
		});
	});

	describe("MerchantTransactionSummary", function () {
		describe("from DTO", function () {
			it("should convert dto", function () {
				const dto = merchantTransactionSummaryDTO();

				assertThat(
					fromMerchantTransactionSummaryDTO(dto),
					is(merchantTransactionSummaryFrom(dto))
				);
			});
		});
	});

	describe("MerchantTransactionDetails", function () {
		describe("from DTO", function () {
			it("should convert dto", function () {
				const dto = merchantTransactionDetailsDTO();

				assertThat(
					fromMerchantTransactionDetailsDTO(dto),
					is(merchantTransactionDetailsFrom(dto))
				);
			});
		});
	});
});
