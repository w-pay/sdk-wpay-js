const { assertThat, defined, is } = require("hamjest");

const { dateFrom } = require("./date-matchers");
const { uppercase } = require("./string-matchers");
const { urlFrom } = require("./url-matches");

const paymentDetailsDTOFrom = (
	primaryPaymentInstrument,
	secondaryInstruments = undefined,
	skipRollback = undefined,
	clientReference = undefined,
	preferences = undefined,
	transactionType = undefined,
	allowPartialSuccess = undefined
) => ({
	matches(actual) {
		assertThat(actual.primaryInstrumentId, is(primaryPaymentInstrument));

		if (secondaryInstruments) {
			assertThat(actual.secondaryInstruments.length, is(secondaryInstruments.length));
			actual.secondaryInstruments.forEach((instrument, i) => {
				assertThat(instrument, is(secondaryInstrumentDTOFrom(secondaryInstruments[i])));
			});
		} else {
			assertThat(actual.secondaryInstruments, is(undefined));
		}

		assertThat(actual.skipRollback, is(skipRollback));
		assertThat(actual.allowPartialSuccess, is(allowPartialSuccess));
		assertThat(actual.clientReference, is(clientReference));
		assertThat(actual.preferences, is(preferences));
		assertThat(actual.transactionType, is(transactionType));

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

const individualPaymentInstrumentFrom = (dto) => ({
	matches(actual) {
		assertThat(actual.allowed, is(dto.data.allowed));
		assertThat(actual.lastUpdated, is(dateFrom(dto.data.lastUpdated)));
		assertThat(actual.lastUsed, is(dateFrom(dto.data.lastUsed)));
		assertThat(actual.paymentInstrumentId, is(dto.data.paymentInstrumentId));
		assertThat(actual.paymentToken, is(dto.data.paymentToken));
		assertThat(actual.primary, is(dto.data.primary));
		assertThat(actual.status, is(uppercase(dto.data.status)));
		assertThat(actual.paymentInstrumentType, is(dto.data.paymentInstrumentType));

		const detail = actual.paymentInstrumentDetail;
		assertThat(detail, is(defined()));
		assertThat(detail.cardSuffix, is(dto.data.paymentInstrumentDetail.cardSuffix));
		assertThat(detail.programName, is(dto.data.paymentInstrumentDetail.programName));

		const stepUp = detail.stepUp;
		assertThat(stepUp, is(defined()));
		assertThat(stepUp.mandatory, is(dto.data.paymentInstrumentDetail.stepUp.mandatory));
		assertThat(stepUp.type, is(dto.data.paymentInstrumentDetail.stepUp.type));

		assertThat(actual.cipherText, is(dto.meta.cipherText));

		return true;
	},

	describeTo(description) {
		description.append(`An IndividualPaymentInstrument from ${JSON.stringify(dto)}`);
	},

	describeMismatch(value, description) {
		description.appendValue(value);
	}
});

module.exports = {
	creditCardFrom,
	giftCardFrom,
	hasPaymentInstrumentsFrom,
	individualPaymentInstrumentFrom,
	paymentDetailsDTOFrom,
	paymentInstrumentAddedFrom,
	secondaryInstrumentDTOFrom,
	walletContentsFrom
};
