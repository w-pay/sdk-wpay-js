"use strict";

const { allOf, assertThat, defined, instanceOf, is, not } = require("hamjest");

const { blankOrMissingString } = require("./string-matchers");

const aQrCode = exports.aQrCode = () =>
	new QRCodeMatcher();

exports.isAQrCode = () =>
	aQrCode();

class QRCodeMatcher {
	matches(item) {
		assertThat(item.qrId, not(blankOrMissingString()));
		assertThat(item.referenceId, not(blankOrMissingString()));
		assertThat(item.referenceType, is(defined()));
		assertThat(item.content, not(blankOrMissingString()));
		assertThat(item.image, not(blankOrMissingString()));
		assertThat(item.expiryTime, is(allOf(defined(), instanceOf(Date))));

		return true;
	}

	describeTo(description) {
		description.append("A QR code");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
