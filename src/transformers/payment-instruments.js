"use strict";

const compose = require("crocks/helpers/compose");
const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");

const { toDate, toUpperCase, toURL } = require("../helpers/props");

const fromPaymentInstrumentDTO = mapProps({
	lastUpdated: toDate,
	lastUsed: toDate,
	status: toUpperCase
});

const fromCreditCardDTO = compose(
	fromPaymentInstrumentDTO,
	mapProps({
		updateURL: toURL,
		stepUp: mapProps({
			url: toURL
		})
	})
);

const fromGiftCardDTO = fromPaymentInstrumentDTO;

exports.fromWalletContentsDTO = mapProps({
	creditCards: map(fromCreditCardDTO),
	giftCards: map(fromGiftCardDTO),
	everydayPay: mapProps({
		creditCards: map(fromCreditCardDTO),
		giftCards: map(fromGiftCardDTO)
	})
});
