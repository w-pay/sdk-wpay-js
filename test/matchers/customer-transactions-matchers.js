"use strict";

const { assertThat, is } = require("hamjest");

const { basketFrom } = require("./basket-matchers");
const { dateFrom } = require("./date-matchers");
const { uppercase } = require("./string-matchers");

const customerTransactionSummaryFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.merchantId, is(dto.merchantId));
		assertThat(actual.merchantReferenceId, is(dto.merchantReferenceId));
		assertThat(actual.paymentRequestId, is(dto.paymentRequestId));
		assertThat(actual.type, is(uppercase(dto.type)));
		assertThat(actual.grossAmount, is(dto.grossAmount));
		assertThat(actual.executionTime, is(dateFrom(dto.executionTime)));
		assertThat(actual.status, is(uppercase(dto.status)));
		assertThat(actual.rollback, is(uppercase(dto.rollback)));
		assertThat(actual.instruments.length, is(dto.instruments.length));
		assertThat(actual.transactionId, is(dto.transactionId));
		assertThat(actual.clientReference, is(dto.clientReference));

		actual.instruments.forEach((instrument, i) => {
			assertThat(instrument, is(customerUsedPaymentInstrumentFrom(dto.instruments[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A CustomerTransactionSummary from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const customerTransactionSummariesFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.transactions.length, is(dto.transactions.length));

		actual.transactions.forEach((transaction, i) => {
			assertThat(transaction, is(customerTransactionSummaryFrom(dto.transactions[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A CustomerTransactionSummaries from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const customerTransactionDetailsFrom = (dto) => ({
	matches(item) {
		assertThat(item, is(customerTransactionSummaryFrom(dto)));
		assertThat(item.basket, basketFrom(dto.basket));

		return true;
	},

	describeTo(description) {
		description.append(`A CustomerTransactionDetails from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const customerUsedPaymentInstrumentFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentInstrumentId, is(dto.paymentInstrumentId));
		assertThat(item.instrumentType, is(dto.instrumentType));

		assertThat(item.transactions.length, is(dto.transactions.length));

		item.transactions.forEach((transaction, i) => {
			assertThat(
				transaction,
				is(customerUsedPaymentInstrumentTransaction(dto.transactions[i]))
			);
		});

		return true;
	},

	describeTo(description) {
		description.append(`A TransactionUsedPaymentInstrument from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const customerUsedPaymentInstrumentTransaction = (dto) => ({
	matches(item) {
		assertThat(item.type, is(uppercase(dto.type)));
		assertThat(item.executionTime, is(dateFrom(dto.executionTime)));
		assertThat(item.paymentTransactionRef, is(dto.paymentTransactionRef));
		assertThat(item.refundTransactionRef, is(dto.refundTransactionRef));
		assertThat(item.status, is(uppercase(dto.status)));
		assertThat(item.amount, is(dto.amount));

		return true;
	},

	describeTo(description) {
		description.append(`A UsedPaymentInstrumentTransaction from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	customerUsedPaymentInstrumentFrom,
	customerTransactionDetailsFrom,
	customerTransactionSummaryFrom,
	customerTransactionSummariesFrom
};
