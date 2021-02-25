"use strict";

/**
 * @type import('../../types/headers/ApiAuthenticator').ApiAuthenticator ApiAuthenticator
 */

/**
 * @param {ApiTokenType} token
 * @return ApiAuthenticator
 */
// toApiAuthenticator :: ApiTokenType -> ApiAuthenticator
const toApiAuthenticator = (token) => {
	if (token === undefined || token === null) {
		return {
			authenticate: () => Promise.resolve("")
		};
	}

	if (typeof token === "string") {
		return {
			authenticate: () => Promise.resolve(token)
		};
	}

	return token;
};

module.exports = {
	toApiAuthenticator
};
