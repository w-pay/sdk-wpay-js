"use strict";

const { assertThat, greaterThan, not } = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");
const { isBasket } = require("./basket-matcher");

exports.customerPaymentRequest = () => {
	return new CustomerPaymentRequestMatcher();
}

class CustomerPaymentRequestMatcher {
	matches(actual) {
		assertThat(actual.merchantId, not(blankOrMissingString()));
		assertThat(actual.paymentRequestId, not(blankOrMissingString()));
		assertThat(actual.merchantReferenceId, not(blankOrMissingString()));
		assertThat(actual.grossAmount, greaterThan(0));
		assertThat(actual.basket, isBasket());

		return true;
	}

	describeTo(description) {
		description.append("A customer payment request");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
