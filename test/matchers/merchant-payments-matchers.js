"use strict";

const { assertThat, is } = require("hamjest");

const { basketFrom } = require("./basket-matchers");
const { dateFrom } = require("./date-matchers");
const { qrCodeFrom } = require("./qr-code-matchers");
const { dynamicPayloadFrom } = require("./dynamic-payload-matchers");

const merchantPaymentSummariesFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.payments.length, is(dto.payments.length));

		actual.payments.forEach((payment, i) => {
			assertThat(payment, is(merchantPaymentSummaryFrom(dto.payments[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantPaymentSummaries from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const merchantPaymentSummaryFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentRequestId, is(dto.paymentRequestId));
		assertThat(item.merchantReferenceId, is(dto.merchantReferenceId));
		assertThat(item.grossAmount, is(dto.grossAmount));
		assertThat(item.usesRemaining, is(dto.usesRemaining));
		assertThat(item.expiryTime, is(dateFrom(dto.expiryTime)));
		assertThat(item.specificWalletId, is(dto.specificWalletId));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantPaymentSummary from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const merchantPaymentDetailsFrom = (dto) => ({
	matches(item) {
		assertThat(item, is(merchantPaymentSummaryFrom(dto)));
		assertThat(item.basket, basketFrom(dto.basket));
		assertThat(item.posPayload, dynamicPayloadFrom(dto.posPayload));
		assertThat(item.merchantPayload, dynamicPayloadFrom(dto.merchantPayload));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantPaymentDetails from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const paymentRequestCreatedFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentRequestId, is(dto.paymentRequestId));
		assertThat(item.qr, qrCodeFrom(dto.qr));

		return true;
	},

	describeTo(description) {
		description.append(`A CreatePaymentRequestResult from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	merchantPaymentDetailsFrom,
	merchantPaymentSummariesFrom,
	merchantPaymentSummaryFrom,
	paymentRequestCreatedFrom
};
