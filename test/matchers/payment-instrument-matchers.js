const { assertThat, defined, is } = require("hamjest");

const { dateFrom } = require("./date-matchers");
const { uppercase } = require("./string-matchers");
const { urlFrom } = require("./url-matches");

const paymentDetailsDTOFrom = (
	primaryPaymentInstrument,
	secondaryInstruments = [],
	skipRollback = undefined,
	clientReference = undefined
) => ({
	matches(actual) {
		assertThat(actual.primaryInstrumentId, is(primaryPaymentInstrument.paymentInstrumentId));

		assertThat(actual.secondaryInstruments.length, is(secondaryInstruments.length));
		actual.secondaryInstruments.forEach((instrument, i) => {
			assertThat(instrument, is(secondaryInstrumentDTOFrom(secondaryInstruments[i])));
		});

		assertThat(actual.skipRollback, is(skipRollback));
		assertThat(actual.clientReference, is(clientReference));

		return true;
	},

	describeTo(description) {
		description.append(
			`Payment details containing ${JSON.stringify({
				primaryPaymentInstrument,
				secondaryInstruments,
				skipRollback,
				clientReference
			})}`
		);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const secondaryInstrumentDTOFrom = (model) => ({
	matches(item) {
		assertThat(item.instrumentId, is(model.paymentInstrumentId));
		assertThat(item.amount, is(model.amount));

		return true;
	},

	describeTo(description) {
		description.append(`A SecondaryInstrumentDTO from ${JSON.stringify(model)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const walletContentsFrom = (dto) => ({
	matches(item) {
		assertThat(item, hasPaymentInstrumentsFrom(dto));
		assertThat(item.everydayPay, hasPaymentInstrumentsFrom(dto.everydayPay));

		return true;
	},

	describeTo(description) {
		description.append(`WalletContents from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const hasPaymentInstrumentsFrom = (dto) => ({
	matches(item) {
		assertThat(item.creditCards, is(defined()));
		item.creditCards.forEach((card, i) => {
			assertThat(card, is(creditCardFrom(dto.creditCards[i])));
		});

		assertThat(item.giftCards, is(defined()));
		item.giftCards.forEach((card, i) => {
			assertThat(card, is(giftCardFrom(dto.giftCards[i])));
		});

		return true;
	},

	describeTo(description) {
		description.append(`PaymentInstruments from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const creditCardFrom = (dto) => ({
	matches(card) {
		assertThat(card.allowed, is(dto.allowed));
		assertThat(card.cardName, is(dto.cardName));
		assertThat(card.cardSuffix, is(dto.cardSuffix));
		assertThat(card.cvvValidated, is(dto.cvvValidated));
		assertThat(card.expired, is(dto.expired));
		assertThat(card.expiryMonth, is(dto.expiryMonth));
		assertThat(card.expiryYear, is(dto.expiryYear));
		assertThat(card.lastUpdated, is(dateFrom(dto.lastUpdated)));
		assertThat(card.lastUsed, is(dateFrom(dto.lastUsed)));
		assertThat(card.paymentInstrumentId, is(dto.paymentInstrumentId));
		assertThat(card.paymentToken, is(dto.paymentToken));
		assertThat(card.primary, is(dto.primary));
		assertThat(card.requiresCVV, is(dto.requiresCVV));
		assertThat(card.scheme, is(dto.scheme));
		assertThat(card.status, is(uppercase(dto.status)));
		assertThat(card.updateURL, is(urlFrom(dto.updateURL)));

		const stepUp = card.stepUp;
		assertThat(stepUp, is(defined()));
		assertThat(stepUp.mandatory, is(dto.stepUp.mandatory));
		assertThat(stepUp.type, is(dto.stepUp.type));
		assertThat(stepUp.url, is(urlFrom(dto.stepUp.url)));

		return true;
	},

	describeTo(description) {
		description.append(`A CreditCard from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const giftCardFrom = (dto) => ({
	matches(card) {
		assertThat(card.allowed, is(dto.allowed));
		assertThat(card.cardSuffix, is(dto.cardSuffix));
		assertThat(card.lastUpdated, is(dateFrom(dto.lastUpdated)));
		assertThat(card.lastUsed, is(dateFrom(dto.lastUsed)));
		assertThat(card.paymentInstrumentId, is(dto.paymentInstrumentId));
		assertThat(card.paymentToken, is(dto.paymentToken));
		assertThat(card.primary, is(dto.primary));
		assertThat(card.status, is(uppercase(dto.status)));
		assertThat(card.programName, is(dto.programName));

		const stepUp = card.stepUp;
		assertThat(stepUp, is(defined()));
		assertThat(stepUp.mandatory, is(dto.stepUp.mandatory));
		assertThat(stepUp.type, is(dto.stepUp.type));

		return true;
	},

	describeTo(description) {
		description.append(`A GiftCard from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

const paymentInstrumentAddedFrom = (dto) => ({
	matches(item) {
		assertThat(item.cardCaptureURL, is(dto.cardCaptureURL));
		assertThat(item.transactionRef, is(dto.transactionRef));

		return true;
	},

	describeTo(description) {
		description.append(`A PaymentInstrumentAdditionResult from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	creditCardFrom,
	giftCardFrom,
	hasPaymentInstrumentsFrom,
	paymentDetailsDTOFrom,
	paymentInstrumentAddedFrom,
	secondaryInstrumentDTOFrom,
	walletContentsFrom
};
