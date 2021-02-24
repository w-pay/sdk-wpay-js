"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromMerchantPaymentDetailsDTO,
	fromMerchantPaymentSummariesDTO,
	fromMerchantPaymentSummaryDTO
} = require("../../src/transformers/merchant-payments");

const {
	merchantPaymentDetailsDTO,
	merchantPaymentSummariesDTO,
	merchantPaymentSummaryDTO
} = require("../data/merchant-payments");
const {
	merchantPaymentDetailsFrom,
	merchantPaymentSummariesFrom,
	merchantPaymentSummaryFrom
} = require("../matchers/merchant-payments-matchers");

describe("Merchant Payments Transformers", function() {
	describe("MerchantPaymentSummaries", function() {
		describe("from DTO", function() {
			it("should convert dto", function() {
				const dto = merchantPaymentSummariesDTO();

				assertThat(fromMerchantPaymentSummariesDTO(dto), is(merchantPaymentSummariesFrom(dto)));
			});
		});
	});

	describe("MerchantPaymentSummary", function() {
		describe("from DTO", function() {
			it("should convert dto", function() {
				const dto = merchantPaymentSummaryDTO()

				assertThat(fromMerchantPaymentSummaryDTO(dto), is(merchantPaymentSummaryFrom(dto)))
			});
		});
	});

	describe("MerchantPaymentDetails", function() {
		describe("from DTO", function() {
			it("should convert dto", function() {
				const dto = merchantPaymentDetailsDTO();

				assertThat(fromMerchantPaymentDetailsDTO(dto), is(merchantPaymentDetailsFrom(dto)));
			});
		});
	});
});
