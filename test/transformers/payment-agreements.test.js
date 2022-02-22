"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromPaymentAgreementsDTO,
	fromPaymentAgreementDTO
} = require("../../src/transformers/payment-agreements");

const { paymentAgreementsDTO, paymentAgreementDTO } = require("../data/payment-agreements");

const {
	paymentAgreementsFrom,
	paymentAgreementFrom
} = require("../matchers/payment-agreements-matchers");

describe("Payment Agreement Transformers", function () {
	describe("PaymentAgreements", function () {
		describe("from DTO", function () {
			it("should convert dto", function () {
				const dto = paymentAgreementsDTO();

				assertThat(fromPaymentAgreementsDTO(dto), is(paymentAgreementsFrom(dto)));
			});
		});
	});

	describe("PaymentAgreement", function () {
		describe("from DTO", function () {
			it("should convert dto", function () {
				const dto = paymentAgreementDTO();

				assertThat(fromPaymentAgreementDTO(dto), is(paymentAgreementFrom(dto)));
			});
		});
	});
});
