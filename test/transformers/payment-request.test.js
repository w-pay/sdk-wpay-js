"use strict";

const { assertThat, is } = require("hamjest");

const {
	fromCreatePaymentRequestResultDTO,
	fromCustomerPaymentRequestDTO,
	toNewPaymentRequestDTO
} = require("../../src/transformers/payment-request");

const {
	aNewPaymentRequest,
	createPaymentRequestResultDTO,
	customerPaymentRequestDTO
} = require("../data/payment-request");
const {
	createPaymentRequestResultFrom,
	customerPaymentRequestFrom,
	newPaymentRequestDTOFrom
} = require("../matchers/payment-request-matchers");

describe("Payment Requests Transformers", function() {
	describe("CreatePaymentRequestResult", function() {
		/*
		 * It makes no sense to convert to a DTO as this is a result from the API
		 */

		describe("from DTO", function() {
			it("should convert dto to create payment request result", function() {
				const dto = createPaymentRequestResultDTO()

				assertThat(
					fromCreatePaymentRequestResultDTO(dto),
					is(createPaymentRequestResultFrom(dto))
				);
			})
		});
	});

	describe("CustomerPaymentRequest", function() {
		/*
		 * It makes no sense to convert to a DTO as this is a result from the API
		 */

		describe("from DTO", function() {
			it("should convert dto to customer payment request", function() {
				const dto = customerPaymentRequestDTO()

				assertThat(
					fromCustomerPaymentRequestDTO(dto),
					is(customerPaymentRequestFrom(dto))
				);
			})
		});
	});

	describe("NewPaymentRequest", function() {
		describe("to DTO", function() {
			it("should convert to DTO", function() {
				const request = aNewPaymentRequest();

				assertThat(toNewPaymentRequestDTO(request), is(newPaymentRequestDTOFrom(request)));
			});
		});
	});
});
