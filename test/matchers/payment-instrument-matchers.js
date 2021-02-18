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

exports.walletContents = () =>
	new WalletContentsMatcher();

exports.hasPaymentInstruments = hasPaymentInstruments = () =>
	new PaymentInstrumentMatcher();

exports.hasCards = hasCards = (matcher) =>
	new CardsMatcher(matcher);

exports.creditCard = creditCard = () =>
	new CreditCardMatcher();

exports.giftCard = giftCard = () =>
	new GiftCardMatcher();

exports.paymentInstrumentAdded = () =>
	new PaymentInstrumentAdditionResultMatcher();

class WalletContentsMatcher {
	matches(item) {
		assertThat(item.creditCards, hasCards(creditCard()));
		assertThat(item.giftCards, hasCards(giftCard()));
		assertThat(item.everydayPay, hasPaymentInstruments());

		return true;
	}

	describeTo(description) {
		description.append("A list of all payments instruments");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class PaymentInstrumentMatcher {
	matches(item) {
		assertThat(item.creditCards, hasCards(creditCard()));
		assertThat(item.giftCards, hasCards(giftCard()));

		return true;
	}

	describeTo(description) {
		description.append("A list of payment instruments");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class CardsMatcher {
	constructor(matcher) {
		this.matcher = matcher;
	}

	matches(list) {
		assertThat(list, is(defined()));
		assertThat(list.length, greaterThanOrEqualTo(1));

		return list.reduce((result, item) => result && this.matcher.matches(item), true);
	}

	describeTo(description) {
		description.append("A list of cards with at least one card");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class CreditCardMatcher {
	matches(card) {
		assertThat(card.allowed, is(defined()));
		assertThat(card.cardName, not(blankOrMissingString()));
		assertThat(card.cardSuffix, not(blankOrMissingString()));
		assertThat(card.cvvValidated, is(defined()));
		assertThat(card.expired, is(defined()));
		assertThat(card.expiryMonth, not(blankOrMissingString()));
		assertThat(card.expiryYear, not(blankOrMissingString()));
		assertThat(card.lastUpdated, is(defined()));
		assertThat(card.lastUsed, is(defined()));
		assertThat(card.paymentInstrumentId, not(blankOrMissingString()));
		assertThat(card.paymentToken, not(blankOrMissingString()));
		assertThat(card.primary, is(defined()));
		assertThat(card.requiresCVV, is(defined()));
		assertThat(card.scheme, not(blankOrMissingString()));
		assertThat(card.status, is(defined()));
		assertThat(card.updateURL, is(allOf(defined(), instanceOf(URL))));

		const stepUp = card.stepUp;
		assertThat(stepUp, is(defined()));
		assertThat(stepUp.mandatory, is(defined()));
		assertThat(stepUp.type, not(blankOrMissingString()));
		assertThat(stepUp.url, is(allOf(defined(), instanceOf(URL))));

		return true;
	}

	describeTo(description) {
		description.append("A Credit Card");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class GiftCardMatcher {
	matches(card) {
		assertThat(card.allowed, is(defined()));
		assertThat(card.cardSuffix, not(blankOrMissingString()));
		assertThat(card.lastUpdated, is(defined()));
		assertThat(card.lastUsed, is(defined()));
		assertThat(card.paymentInstrumentId, not(blankOrMissingString()));
		assertThat(card.paymentToken, not(blankOrMissingString()));
		assertThat(card.primary, is(defined()));
		assertThat(card.status, is(defined()));
		assertThat(card.programName, not(blankOrMissingString()));

		const stepUp = card.stepUp;
		assertThat(stepUp, is(defined()));
		assertThat(stepUp.mandatory, is(defined()));
		assertThat(stepUp.type, not(blankOrMissingString()));

		return true;
	}

	describeTo(description) {
		description.append("A Gift Card");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}

class PaymentInstrumentAdditionResultMatcher {
	matches(item) {
		assertThat(item.cardCaptureURL, not(blankOrMissingString()));
		assertThat(item.transactionRef, not(blankOrMissingString()));

		return true;
	}

	describeTo(description) {
		description.append("A successful payment instrument addition result");
	}

	describeMismatch(value, description) {
		description.appendValue(value);
	}
}
