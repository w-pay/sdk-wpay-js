"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromCustomerTransactionDetailsDTO,
	fromCustomerTransactionSummaryDTO,
	fromCustomerTransactionSummariesDTO
} = require("../../src/transformers/customer-transactions");

const {
	customerTransactionDetailsDTO,
	customerTransactionSummariesDTO,
	customerTransactionSummaryDTO
} = require("../data/customer-transactions");
const {
	customerTransactionDetailsFrom,
	customerTransactionSummaryFrom,
	customerTransactionSummariesFrom
} = require("../matchers/customer-transactions-matchers");

describe("Customer Transactions Transformers", function() {
	describe("CustomerTransactionSummaries", function() {
		describe("from DTO", function() {
			it("should convert dto", function() {
				const dto = customerTransactionSummariesDTO();

				assertThat(
					fromCustomerTransactionSummariesDTO(dto),
					is(customerTransactionSummariesFrom(dto))
				)
			});
		});
	});

	describe("CustomerTransactionSummary", function() {
		describe("from DTO", function() {
			it("should convert dto", function() {
				const dto = customerTransactionSummaryDTO();

				assertThat(
					fromCustomerTransactionSummaryDTO(dto),
					is(customerTransactionSummaryFrom(dto))
				)
			});
		});
	});

	describe("CustomerTransactionDetails", function() {
		describe("from DTO", function() {
			it("should convert dto", function() {
				const dto = customerTransactionDetailsDTO();

				assertThat(
					fromCustomerTransactionDetailsDTO(dto),
					is(customerTransactionDetailsFrom(dto))
				)
			});
		});
	});
});
