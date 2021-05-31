"use strict";

const { assertThat, is } = require("hamjest");

const { fromCreatePaymentRequestResultDTO } = require("../../src/transformers/payment-request");

const { createPaymentRequestResultDTO } = require("../data/payment-request");
const { createPaymentRequestResultFrom } = require("../matchers/payment-request-matchers");

describe("Payment Requests Transformers", function () {
	describe("CreatePaymentRequestResult", function () {
		/*
		 * It makes no sense to convert to a DTO as this is a result from the API
		 */

		describe("from DTO", function () {
			it("should convert dto to create payment request result", function () {
				const dto = createPaymentRequestResultDTO();

				assertThat(
					fromCreatePaymentRequestResultDTO(dto),
					is(createPaymentRequestResultFrom(dto))
				);
			});
		});
	});
});
