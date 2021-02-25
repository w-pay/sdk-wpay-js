"use strict";

exports.preferences = () =>
	(function () {
		const preferencesGroup = new Map();
		preferencesGroup.set("preference", "value");

		const preferences = new Map();
		preferences.set("group", preferencesGroup);

		return preferences;
	})();

exports.preferencesDTO = () => ({
	group: {
		preference: "value"
	}
});
