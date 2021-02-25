"use strict";

const { assertThat, equalTo, fail, hasProperty, is } = require("hamjest");

const { getPropOrError } = require("../../src/helpers/props");

describe("props helpers", function () {
	describe("getPropOrError", function () {
		it("should return prop in object", function () {
			const x = 1;

			const result = getPropOrError("x", { x });
			assertThat(result.type(), is("Result"));

			result.either(
				(err) => {
					throw err;
				},
				(value) => {
					assertThat(value, is(x));
				}
			);
		});

		it("should return error if prop not in object", function () {
			const result = getPropOrError("x", {});
			assertThat(result.type(), is("Result"));

			result.either(
				(err) => {
					assertThat(err, hasProperty("message", equalTo(`'x' is mandatory and missing`)));
				},
				() => fail("Result.Ok returned")
			);
		});
	});
});
