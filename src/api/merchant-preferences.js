"use strict";

const { getPreferences, setPreferences } = require("./preferences");

const getPrefs = getPreferences({
	url: "/instore/merchant/preferences"
});

const setPrefs = setPreferences({
	url: "/instore/merchant/preferences"
});

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPreferences').CustomerPreferencesApi} */
	return {
		get: getPrefs(client),
		set: setPrefs(client)
	};
};
