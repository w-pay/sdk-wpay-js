"use strict";

const Async = require("crocks/Async");

const { JSON_MIME_TYPE } = require("@api-sdk-creator/http-api-client");

class StubHttpClient {
	constructor() {
		this.request = null;

		this.response = {
			statusCode: 200,
			statusMessage: "OK",
			headers: {
				"content-type": JSON_MIME_TYPE
			}
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
