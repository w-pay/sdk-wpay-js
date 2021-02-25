"use strict";

const { assertThat, defined, is } = require("hamjest");

const { objectToMap } = require("../../src/transformers/object");

describe("Object transformers", function () {
	describe("Object to Map", function () {
		it("should convert an object to a map", function () {
			const obj = {
				a: 1,
				b: "foo",
				c: false,
				d: [],
				e: {
					x: 0
				}
			};

			const map = objectToMap(obj);

			assertThat(map.size, is(5));
			assertThat(map.get("a"), is(obj.a));
			assertThat(map.get("b"), is(obj.b));
			assertThat(map.get("c"), is(obj.c));
			assertThat(map.get("d"), is(obj.d));

			const e = map.get("e");
			assertThat(e, is(defined()));
			assertThat(e.get("x"), is(0));
		});
	});
});
