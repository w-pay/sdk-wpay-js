const { assertThat, is } = require("hamjest");

const { dateFrom } = require("./date-matchers");
const { dynamicPayloadFrom } = require("./dynamic-payload-matchers");
const { qrCodeFrom } = require("./qr-code-matchers");

exports.paymentSessionFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentSessionId, is(dto.paymentSessionId));
		assertThat(item.paymentRequestId, is(dto.paymentRequestId));
		assertThat(item.merchantId, is(dto.merchantId));
		assertThat(item.walletId, is(dto.walletId));
		assertThat(item.expiryTime, is(dateFrom(dto.expiryTime)));
		assertThat(item.location, is(dto.location));
		assertThat(item.merchantInfo, is(dynamicPayloadFrom(dto.merchantInfo)));
		assertThat(item.customerInfo, is(dynamicPayloadFrom(dto.customerInfo)));

		return true;
	},

	describeTo(description) {
		description.append(`A PaymentSession from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.createPaymentSessionRequestDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual.location, is(model.location));
		assertThat(actual.generateQR, is(model.generateQR));
		assertThat(actual.timeToLivePaymentSession, is(model.timeToLivePaymentSession));
		assertThat(actual.timeToLiveQR, is(model.timeToLiveQR));
		assertThat(actual.merchantInfo, is(dynamicPayloadFrom(model.merchantInfo)));

		return true;
	},

	describeTo(description) {
		description.append(`A CreatePaymentSessionRequest from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.customerUpdatePaymentSessionRequestDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual.customerInfo, is(dynamicPayloadFrom(model.customerInfo)));

		return true;
	},

	describeTo(description) {
		description.append(`A CustomerUpdatePaymentSessionRequest from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.merchantUpdatePaymentSessionRequestDTOFrom = (model) => ({
	matches(actual) {
		assertThat(actual.paymentRequestId, is(model.paymentRequestId));
		assertThat(actual.merchantInfo, is(dynamicPayloadFrom(model.merchantInfo)));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantUpdatePaymentSessionRequest from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

exports.paymentSessionCreatedFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentSessionId, is(dto.paymentSessionId));
		assertThat(item.qr, qrCodeFrom(dto.qr));

		return true;
	},

	describeTo(description) {
		description.append(`A CreatePaymentSessionResult from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
