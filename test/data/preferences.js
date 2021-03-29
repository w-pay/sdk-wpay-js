"use strict";

const { v4: uuid } = require("uuid");

exports.preferences = () =>
	(function () {
		const preferencesGroup = new Map();
		preferencesGroup.set("preference", "value");

		const preferences = new Map();
		preferences.set("group", preferencesGroup);

		return preferences;
	})();

exports.paymentPreferences = () => ({
	primaryPaymentId: uuid(),
	secondaryInstruments: []
});

exports.preferencesDTO = () => ({
	group: {
		preference: "value"
	}
});
