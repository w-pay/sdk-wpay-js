"use strict";

const { assertThat, is } = require("hamjest");

const digitalPayPaymentAgreementFrom = (dto) => ({
	matches(item) {
		assertThat(item.transactionReceipt, is(dto.transactionReceipt));
		assertThat(item.paymentToken, is(dto.paymentToken));
		assertThat(item.paymentAgreement, is(dto.paymentAgreement));
		assertThat(item.fraudResponse, is(dto.fraudResponse));
		assertThat(item.extendedTransactionData, is(dto.extendedTransactionData));
		assertThat(item.externalServiceCode, is(dto.externalServiceCode));
		assertThat(item.externalServiceMessage, is(dto.externalServiceMessage));

		return true;
	},

	describeTo(description) {
		description.append(`A DigitalPayPaymentAgreementResponse from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	digitalPayPaymentAgreementFrom
};
