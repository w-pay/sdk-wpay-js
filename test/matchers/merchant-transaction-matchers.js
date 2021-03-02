const { assertThat, is } = require("hamjest");

const { basketFrom } = require("./basket-matchers");
const { dateFrom } = require("./date-matchers");
const { dynamicPayloadFrom } = require("./dynamic-payload-matchers");
const { uppercase } = require("./string-matchers");

const merchantTransactionSummariesFrom = (dto) => ({
	matches(item) {
		assertThat(item.transactions.length, is(dto.transactions.length));

		item.transactions.forEach((transaction, i) => {
			assertThat(transaction, is(merchantTransactionSummaryFrom(dto.transactions[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantTransactionSummaries from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const merchantTransactionSummaryFrom = (dto) => ({
	matches(item) {
		assertThat(item.walletId, is(dto.walletId));
		assertThat(item.merchantReferenceId, is(dto.merchantReferenceId));
		assertThat(item.paymentRequestId, is(dto.paymentRequestId));
		assertThat(item.type, is(uppercase(dto.type)));
		assertThat(item.grossAmount, is(dto.grossAmount));
		assertThat(item.executionTime, is(dateFrom(dto.executionTime)));
		assertThat(item.status, is(uppercase(dto.status)));
		assertThat(item.rollback, is(uppercase(dto.rollback)));
		assertThat(item.transactionId, is(dto.transactionId));
		assertThat(item.clientReference, is(dto.clientReference));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantTransactionSummary from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const merchantTransactionDetailsFrom = (dto) => ({
	matches(item) {
		assertThat(item, is(merchantTransactionSummaryFrom(dto)));
		assertThat(item.basket, is(basketFrom(dto.basket)));
		assertThat(item.posPayload, is(dynamicPayloadFrom(dto.posPayload)));
		assertThat(item.merchantPayload, is(dynamicPayloadFrom(dto.merchantPayload)));

		return true;
	},

	describeTo(description) {
		description.append(`A MerchantTransactionSummary from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	merchantTransactionDetailsFrom,
	merchantTransactionSummariesFrom,
	merchantTransactionSummaryFrom
};
