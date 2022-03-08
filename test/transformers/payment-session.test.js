"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromCreatePaymentSessionResultDTO,
	fromPaymentSessionDTO
} = require("../../src/transformers/payment-session");

const { createPaymentSessionResultDTO, paymentSessionDTO } = require("../data/payment-session");
const {
	paymentSessionCreatedFrom,
	paymentSessionFrom
} = require("../matchers/payment-session-matchers");

describe("Payment Session Transformers", function () {
	describe("CreatePaymentSessionResult", function () {
		/*
		 * This will only ever be a result from the API
		 */
		describe("from DTO", function () {
			it("should dto to create payment session result", function () {
				const dto = createPaymentSessionResultDTO();

				assertThat(fromCreatePaymentSessionResultDTO(dto), is(paymentSessionCreatedFrom(dto)));
			});
		});
	});

	describe("PaymentSession", function () {
		describe("from DTO", function () {
			it("should convert dto to payment session", function () {
				const dto = paymentSessionDTO();

				assertThat(fromPaymentSessionDTO(dto), is(paymentSessionFrom(dto)));
			});
		});
	});
});
