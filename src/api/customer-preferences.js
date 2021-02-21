"use strict";

const { getPreferences, setPreferences } = require("./preferences");

const getPrefs = getPreferences({
	url: "/customer/preferences"
})

const setPrefs = setPreferences({
	url: "/customer/preferences",
})

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPreferences').CustomerPreferencesApi} */
	return {
		get: getPrefs(client),
		set: setPrefs(client)
	};
}
