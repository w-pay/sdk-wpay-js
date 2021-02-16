"use strict";

const Async = require("crocks/Async");

class StubHttpClient {
	constructor() {
		this.response = {
			statusCode: 200,
			statusMessage: "OK",
			headers: {},
		};
	}

	factory() {
		return () => (request) => {
			this.request = request;

			return Async((reject, resolve) => {
				resolve({
					request,
					response: this.response
				})
			});
		}
	}
}

module.exports = {
	StubHttpClient
}
