"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromCreatePaymentSessionResultDTO,
	fromPaymentSessionDTO,
	toCreatePaymentSessionRequestDTO,
	toCustomerUpdatePaymentSessionRequestDTO,
	toMerchantUpdatePaymentSessionRequestDTO
} = require("../../src/transformers/payment-session");

const {
	aCreatePaymentSessionRequest,
	aCustomerUpdatePaymentSessionRequest,
	aMerchantUpdatePaymentSessionRequest,
	createPaymentSessionResultDTO,
	paymentSessionDTO
} = require("../data/payment-session");
const {
	createPaymentSessionRequestDTOFrom,
	customerUpdatePaymentSessionRequestDTOFrom,
	merchantUpdatePaymentSessionRequestDTOFrom,
	paymentSessionCreatedFrom,
	paymentSessionFrom
} = require("../matchers/payment-session-matchers");

describe("Payment Session Transformers", function () {
	describe("CreatePaymentSessionRequest", function () {
		/*
		 * We will only ever be sending this to the API
		 */
		describe("to DTO", function () {
			it("should convert merchant info", function () {
				const request = aCreatePaymentSessionRequest();

				assertThat(
					toCreatePaymentSessionRequestDTO(request),
					is(createPaymentSessionRequestDTOFrom(request))
				);
			});
		});
	});

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

	describe("CustomerUpdatePaymentSessionRequest", function () {
		describe("to DTO", function () {
			it("should convert customer info", function () {
				const request = aCustomerUpdatePaymentSessionRequest();

				assertThat(
					toCustomerUpdatePaymentSessionRequestDTO(request),
					is(customerUpdatePaymentSessionRequestDTOFrom(request))
				);
			});
		});
	});

	describe("MerchantUpdatePaymentSessionRequest", function () {
		describe("to DTO", function () {
			it("should convert merchant info", function () {
				const request = aMerchantUpdatePaymentSessionRequest();

				assertThat(
					toMerchantUpdatePaymentSessionRequestDTO(request),
					is(merchantUpdatePaymentSessionRequestDTOFrom(request))
				);
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
