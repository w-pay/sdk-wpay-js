"use strict";

const { getPreferences, setPreferences } = require("./preferences");

const getPrefs = getPreferences({
	url: "/instore/customer/preferences"
});

const setPrefs = setPreferences({
	url: "/instore/customer/preferences"
});

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPreferences').CustomerPreferencesApi} */
	return {
		get: getPrefs(client),
		set: setPrefs(client)
	};
};
