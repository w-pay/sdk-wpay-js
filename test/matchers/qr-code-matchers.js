"use strict";

const { assertThat, is } = require("hamjest");

const { dateFrom } = require("./date-matchers");
const { uppercase } = require("./string-matchers");

exports.qrCodeFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.qrId, is(dto.qrId));
		assertThat(actual.referenceId, is(dto.referenceId));
		assertThat(actual.referenceType, is(uppercase(dto.referenceType)));
		assertThat(actual.content, is(dto.content));
		assertThat(actual.image, is(dto.image));
		assertThat(actual.expiryTime, is(dateFrom(dto.expiryTime)));

		return true;
	},

	describeTo(description) {
		description.append(`A QRCode from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});
