const {
	allOf,
	assertThat,
	defined,
	instanceOf,
	is,
	not
} = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");
const { isAQrCode } = require("./qr-code-matcher");
const { isDynamicPayload } = require("./merchant-payload-matchers");

exports.paymentSession = () =>
	new PaymentSessionMatcher();

class PaymentSessionMatcher {
	matches(item) {
		assertThat(item.paymentSessionId, not(blankOrMissingString()));
		assertThat(item.paymentRequestId, blankOrMissingString());
		assertThat(item.merchantId, not(blankOrMissingString()));
		assertThat(item.walletId, is(undefined));
		assertThat(item.expiryTime, is(allOf(defined(), instanceOf(Date))));
		assertThat(item.location, not(blankOrMissingString()));
		assertThat(item.merchantInfo, isDynamicPayload());
		assertThat(item.customerInfo, isDynamicPayload());

		return true;
	}

	describeTo(description) {
		description.append("A payment session");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

exports.paymentSessionCreated = () =>
	new CreatePaymentSessionResultMatcher();

class CreatePaymentSessionResultMatcher {
	matches(item) {
		assertThat(item.paymentSessionId, not(blankOrMissingString()));
		assertThat(item.qr, isAQrCode());

		return true;
	}

	describeTo(description) {
		description.append("A created payment session");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
