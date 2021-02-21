"use strict";

const {
	allOf,
	assertThat,
	defined,
	greaterThanOrEqualTo,
	instanceOf,
	is,
	not
} = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");
const { isBasket } = require("./basket-matcher");
const { isAQrCode } = require("./qr-code-matcher");
const { isDynamicPayload } = require("./merchant-payload-matchers");

exports.merchantPaymentSummaries = () =>
	new MerchantPaymentSummariesMatcher();

class MerchantPaymentSummariesMatcher {
	matches(item) {
		const matcher = new MerchantPaymentSummaryMatcher();

		assertThat(item.payments.length, greaterThanOrEqualTo(1));

		return item.payments.reduce((result, it) => result && matcher.matches(it), true);
	}

	describeTo(description) {
		description.append("A list of payments");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class MerchantPaymentSummaryMatcher {
	matches(item) {
		assertThat(item.paymentRequestId, not(blankOrMissingString()));
		assertThat(item.merchantReferenceId, not(blankOrMissingString()));
		assertThat(item.grossAmount, is(defined()));
		assertThat(item.usesRemaining, is(defined()));
		assertThat(item.expiryTime, is(allOf(defined(), instanceOf(Date))));
		assertThat(item.specificWalletId, not(blankOrMissingString()));

		return true;
	}

	describeTo(description) {
		description.append("A merchant payment summary");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.merchantPaymentDetails = () =>
	new MerchantPaymentDetailsMatcher();

class MerchantPaymentDetailsMatcher extends MerchantPaymentSummaryMatcher {
	matches(item) {
		assertThat(item.basket, isBasket());
		assertThat(item.posPayload, isDynamicPayload());
		assertThat(item.merchantPayload, isDynamicPayload());

		return super.matches(item);
	}

	describeTo(description) {
		description.append("Merchant Payment Details");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.paymentRequestCreated = () =>
	new CreatePaymentRequestResultMatcher();

class CreatePaymentRequestResultMatcher {
	matches(item) {
		assertThat(item.paymentRequestId, not(blankOrMissingString()));
		assertThat(item.qr, isAQrCode());

		return true;
	}

	describeTo(description) {
		description.append("A payment request result");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
