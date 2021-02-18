"use strict";

const {
	allOf,
	assertThat,
	defined,
	greaterThan,
	greaterThanOrEqualTo,
	hasItems,
	instanceOf,
	is,
	not
} = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");
const { isBasket } = require("./basket-matcher");

exports.customerTransactionSummaries = () =>
	new CustomerTransactionsSummariesMatcher();

class CustomerTransactionsSummariesMatcher {
	matches(actual) {
		const transactionMatcher = new CustomerTransactionSummaryMatcher();

		assertThat(actual.transactions.length, greaterThan(0));

		return actual.transactions.reduce(
			(result, it) => result && transactionMatcher.matches(it),
			true
		);
	}

	describeTo(description) {
		description.append("A list of customer transaction summaries");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.customerTransactionSummary = () =>
	new CustomerTransactionSummaryMatcher();

class CustomerTransactionSummaryMatcher {
	matches(actual) {
		assertThat(actual.merchantId, not(blankOrMissingString()));
		assertThat(actual.merchantReferenceId, not(blankOrMissingString()));
		assertThat(actual.paymentRequestId, not(blankOrMissingString()));
		assertThat(actual.type, is(defined()));
		assertThat(actual.grossAmount, is(defined()));
		assertThat(actual.executionTime, is(allOf(defined(), instanceOf(Date))));
		assertThat(actual.status, is(defined()));
		assertThat(actual.instruments.length, greaterThanOrEqualTo(1));
		assertThat(actual.instruments, hasItems(withCustomerPaymentInstruments()));
		assertThat(actual.transactionId, not(blankOrMissingString()));
		assertThat(actual.clientReference, not(blankOrMissingString()));

		return true;
	}

	describeTo(description) {
		description.append("A Customer Transaction Summary");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.customerTransactionDetails = () =>
	new CustomerTransactionDetailsMatcher();

class CustomerTransactionDetailsMatcher {
	matches(item) {
		const summaryMatcher = new CustomerTransactionSummaryMatcher();

		assertThat(item.basket, isBasket());

		return summaryMatcher.matches(item);
	}

	describeTo(description) {
		description.append("Details on a customer transaction");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

const withCustomerPaymentInstruments = exports.withCustomerPaymentInstruments = () =>
	new CustomerPaymentInstrumentsMatcher();

class CustomerPaymentInstrumentsMatcher {
	matches(item) {
		assertThat(item.paymentInstrumentId, not(blankOrMissingString()));
		assertThat(item.amount, is(defined()));

		return true;
	}

	describeTo(description) {
		description.append("Customer Transaction Summary with instruments");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
