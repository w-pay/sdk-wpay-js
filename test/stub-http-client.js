"use strict";

const Async = require("crocks/Async");

class StubHttpClient {
	constructor() {
		this.request = null;

		this.response = {
			statusCode: 200,
			statusMessage: "OK",
			headers: {}
		};
	}

	factory() {
		return () => this.client();
	}

	client() {
		return (request) => {
			this.request = request;

			return Async.of({
				request,
				response: this.response
			});
		};
	}
}

module.exports = {
	StubHttpClient
};
