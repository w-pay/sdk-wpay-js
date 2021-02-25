"use strict";

const { assertThat, equalTo, is } = require("hamjest");

const { mapToObject } = require("../../src/transformers/map");

describe("Map transformers", function () {
	describe("Map to object", function () {
		it("should convert a map to an object", function () {
			const map = new Map();
			map.set("a", 1);
			map.set("b", "foo");
			map.set("c", false);
			map.set("d", []);

			const e = new Map();
			e.set("x", 0);

			map.set("e", e);

			const obj = mapToObject(map);

			assertThat(Object.keys(obj).length, is(map.size));
			assertThat(obj.a, is(map.get("a")));
			assertThat(obj.b, is(map.get("b")));
			assertThat(obj.c, is(map.get("c")));
			assertThat(obj.d, is(map.get("d")));
			assertThat(obj.e, is(equalTo({ x: 0 })));
		});
	});
});
