const { assertThat, instanceOf, is } = require("hamjest");

const {
	fromDynamicPayloadDTO,
	toDynamicPayloadDTO
} = require("../../src/transformers/dynamic-payload");

describe("Dynamic Payload transformers", function () {
	describe("to DTO", function () {
		it("should convert payload to object", function () {
			const dto = toDynamicPayloadDTO({
				schemaId: "12345",
				payload: (function () {
					const payload = new Map();
					payload.set("a", 1);

					return payload;
				})()
			});

			assertThat(dto.payload["a"], is(1));
		});
	});

	describe("from DTO", function () {
		const dto = {
			schemaId: "1234",
			payload: {
				a: 1
			}
		};

		it("should convert payload to map", function () {
			const payload = fromDynamicPayloadDTO(dto);

			assertThat(payload.payload, is(instanceOf(Map)));
			assertThat(payload.payload.get("a"), is(1));
		});
	});
});
