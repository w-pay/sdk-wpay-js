"use strict";

const { HttpRequestMethod } = require("@sdk-creator/http-api-client");

const checkHealth = (client) => () => {
	return client({
		method: HttpRequestMethod.GET,
		url: "/",
	})
	.toPromise();
}

module.exports = (client) => {
	/** @implements {import('../../types/api/Administration').AdministrationApi} */
	return {
		checkHealth: checkHealth(client)
	};
}
