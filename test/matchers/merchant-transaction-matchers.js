const { allOf, assertThat, defined,  greaterThan, instanceOf, is, not } = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");

exports.merchantTransactionSummaries = () =>
	new MerchantTransactionsSummariesMatcher();

class MerchantTransactionsSummariesMatcher {
	matches(item) {
		const transactionMatcher = new MerchantTransactionSummaryMatcher();

		assertThat(item.transactions.length, greaterThan(0));

		return item.transactions.reduce(
			(result, it) => result && transactionMatcher.matches(it),
			true
		);
	}

	describeTo(description) {
		description.append("A list of merchant transactions");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.merchantTransactionSummary = () =>
	new MerchantTransactionSummaryMatcher();

class MerchantTransactionSummaryMatcher {
	matches(item) {
		assertThat(item.walletId, not(blankOrMissingString()));
		assertThat(item.merchantReferenceId, not(blankOrMissingString()));
		assertThat(item.paymentRequestId, not(blankOrMissingString()));
		assertThat(item.type, is(defined()));
		assertThat(item.grossAmount, is(defined()));
		assertThat(item.executionTime, is(allOf(defined(), instanceOf(Date))));
		assertThat(item.status, is(defined()));
		assertThat(item.transactionId, not(blankOrMissingString()));
		assertThat(item.clientReference, blankOrMissingString());

		return true;
	}

	describeTo(description) {
		description.append("A Merchant Transaction Summary");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.merchantTransactionDetails = () =>
	new MerchantTransactionDetailsMatcher();

class MerchantTransactionDetailsMatcher {
	matches(item) {
		assertThat(item.basket, is(defined()));
		assertThat(item.posPayload, is(defined()));
		assertThat(item.merchantPayload, is(defined()));

		return new MerchantTransactionSummaryMatcher().matches(item);
	}

	describeTo(description) {
		description.append("A Merchant Transaction Summary");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
