"use strict";

const { v4: uuid } = require("uuid");

exports.preferences = () => ({
	group: {
		preference: "value"
	}
});

exports.paymentPreferences = () => ({
	primaryPaymentId: uuid(),
	secondaryInstruments: null
});

exports.preferencesDTO = () => ({
	group: {
		preference: "value"
	}
});
