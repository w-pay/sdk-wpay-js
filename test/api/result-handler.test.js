"use strict";

const {
	allOf,
	assertThat,
	hasProperty,
	instanceOf,
	is,
	isRejectedWith,
	promiseThat
} = require("hamjest");

const { HttpErrorException, JsonParsingException } = require("../../src/api/api-errors");
const { resultHandler } = require("../../src/api/result-handler");

const { givenHttpResult, givenHttpResponse } = require("../data/http");

describe("result handler", function () {
	it("should return body on success", async function () {
		const body = { a: 1, x: "foo" };

		const result = await httpResult(givenHttpResult(givenHttpResponse(body)));

		assertThat(result, is(body));
	});

	it("should return JsonParsingException when response body can't be parsed", async function () {
		const response = givenHttpResponse("some content");

		await promiseThat(
			httpResult(givenHttpResult(response)),
			isRejectedWith(
				allOf(
					instanceOf(JsonParsingException),
					allOf(
						hasProperty("message", "Unexpected token s in JSON at position 0"),
						hasProperty("details")
					)
				)
			)
		);
	});

	it("should return HttpErrorException on http failure", async function () {
		const response = givenHttpResponse("some content", { "x-header": "foo" }, 500);

		await promiseThat(
			httpResult(givenHttpResult(response)),
			isRejectedWith(
				allOf(
					instanceOf(HttpErrorException),
					allOf(
						hasProperty("statusCode", response.statusCode),
						hasProperty("responseHeaders", response.headers),
						hasProperty("responseBody", response.body)
					)
				)
			)
		);
	});

	it("should wrap error in ApiException");

	function httpResult(result) {
		return resultHandler()(result).toPromise();
	}
});
