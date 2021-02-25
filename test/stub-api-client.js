"use strict";

const Async = require("crocks/Async");

class StubApiClient {
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

			return Async.of(this.response);
		};
	}
}

module.exports = {
	StubApiClient
};
