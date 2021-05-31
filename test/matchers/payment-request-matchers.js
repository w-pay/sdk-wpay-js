"use strict";

const { assertThat, is } = require("hamjest");

const { basketFrom } = require("./basket-matchers");
const { dynamicPayloadFrom } = require("./dynamic-payload-matchers");
const { qrCodeFrom } = require("./qr-code-matchers");

exports.createPaymentRequestResultFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.paymentRequestId, is(dto.paymentRequestId));
		assertThat(actual.qr, is(qrCodeFrom(dto.qr)));

		return true;
	},

	describeTo(description) {
		description.append(`A CreatePaymentRequestResult from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.customerPaymentRequestFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.merchantId, is(dto.merchantId));
		assertThat(actual.paymentRequestId, is(dto.paymentRequestId));
		assertThat(actual.merchantReferenceId, is(dto.merchantReferenceId));
		assertThat(actual.grossAmount, is(dto.grossAmount));
		assertThat(actual.basket, is(basketFrom(dto.basket)));

		return true;
	},

	describeTo(description) {
		description.append(`A CustomerPaymentRequest from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.newPaymentRequestDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual.merchantReferenceId, is(model.merchantReferenceId));
		assertThat(actual.grossAmount, is(model.grossAmount));
		assertThat(actual.generateQR, is(model.generateQR));
		assertThat(actual.maxUses, is(model.maxUses));
		assertThat(actual.timeToLivePayment, is(model.timeToLivePayment));
		assertThat(actual.timeToLiveQR, is(model.timeToLiveQR));
		assertThat(actual.specificWalletId, is(model.specificWalletId));
		assertThat(actual.basket, is(basketFrom(model.basket)));
		assertThat(actual.posPayload, is(dynamicPayloadFrom(model.posPayload)));
		assertThat(actual.merchantPayload, is(dynamicPayloadFrom(model.merchantPayload)));

		return true;
	},

	describeTo(description) {
		description.append(`A NewPaymentRequest from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
