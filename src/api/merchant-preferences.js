"use strict";

const { getPreferences, setPreferences } = require("./preferences");

const getPrefs = getPreferences({
	url: "/merchant/preferences"
});

const setPrefs = setPreferences({
	url: "/merchant/preferences"
});

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPreferences').CustomerPreferencesApi} */
	return {
		get: getPrefs(client),
		set: setPrefs(client)
	};
};
