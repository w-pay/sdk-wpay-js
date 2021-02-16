"use strict";

const getPreferences = (client) => () => Promise.resolve();

const setPreferences = (client, preferences) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPreferences').CustomerPreferencesApi} */
	return {
		get: getPreferences(client),
		set: setPreferences(client)
	};
}
