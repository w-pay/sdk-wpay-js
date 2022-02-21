"use strict";

const identity = require("crocks/combinators/identity");

const {
	allOf,
	assertThat,
	hasProperty,
	instanceOf,
	is,
	isRejectedWith,
	promiseThat
} = require("hamjest");

const { fromData } = require("../../src/transformers/data");

describe("Transformer pipes", function () {
	const square = ({ x }) => ({ y: x * 2 });

	describe("fromData", function () {
		it("should convert data", async function () {
			const result = await fromData(square, { data: { x: 2 } }).toPromise();

			assertThat(result.y, is(4));
		});

		it("should return error if data missing", async function () {
			await promiseThat(
				fromData(identity, {}).toPromise(),
				isRejectedWith(
					allOf(instanceOf(Error), hasProperty("message", "'data' is mandatory and missing"))
				)
			);
		});

		it("should return error if transform failed", async function () {
			const error = new Error("Transformation error");
			const fn = () => {
				throw error;
			};

			await promiseThat(fromData(fn, { data: {} }).toPromise(), isRejectedWith(error));
		});
	});
});
