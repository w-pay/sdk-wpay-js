"use strict";

const { assertThat, is } = require("hamjest");

const { dateFrom } = require("./date-matchers");
const { uppercase } = require("./string-matchers");
const { urlFrom } = require("./url-matches");

const paymentAgreementsFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentAgreements.length, is(dto.paymentAgreements.length));

		item.paymentAgreements.forEach((paymentAgreement, i) => {
			assertThat(paymentAgreement, is(paymentAgreementFrom(dto.paymentAgreements[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`A PaymentAgreements from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const paymentAgreementFrom = (dto) => ({
	matches(item) {
		assertThat(item.paymentToken, is(dto.paymentToken));
		assertThat(item.status, is(uppercase(dto.status)));
		assertThat(item.lastUpdated, is(dateFrom(dto.lastUpdated)));
		assertThat(item.lastUsed, is(dateFrom(dto.lastUsed)));
		assertThat(item.createdOn, is(dateFrom(dto.createdOn)));
		assertThat(item.primary, is(dto.primary));
		assertThat(item.allowed, is(dto.allowed));
		assertThat(item.type, is(uppercase(dto.type)));
		assertThat(item.paymentInstrumentId, is(dto.paymentInstrumentId));
		assertThat(item.scheme, is(dto.scheme));
		assertThat(item.cardSuffix, is(dto.cardSuffix));
		assertThat(item.expiryMonth, is(dto.expiryMonth));
		assertThat(item.expiryYear, is(dto.expiryYear));
		assertThat(item.startDate, is(dateFrom(dto.startDate)));
		assertThat(item.endDate, is(dateFrom(dto.endDate)));
		assertThat(item.chargeFrequency, is(uppercase(dto.chargeFrequency)));
		assertThat(item.chargeAmount, is(dto.chargeAmount));
		assertThat(item.chargeCycle, is(dto.chargeCycle));
		assertThat(item.expired, is(dto.expired));
		assertThat(item.updateURL, is(urlFrom(dto.updateURL)));
		assertThat(item.stepUp.type, is(dto.stepUp.type));
		assertThat(item.stepUp.mandatory, is(dto.stepUp.mandatory));
		assertThat(item.stepUp.url, is(dto.stepUp.url));
		assertThat(item.description, is(dto.description));

		return true;
	},

	describeTo(description) {
		description.append(`A PaymentAgreement from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	paymentAgreementFrom,
	paymentAgreementsFrom
};
