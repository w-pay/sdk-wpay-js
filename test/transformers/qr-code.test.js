const { assertThat, instanceOf, is } = require("hamjest");

const { fromQrDTO } = require("../../src/transformers/qr-code");

describe("QR code transformers", function() {
	describe("from DTO", function() {
		const dto = {
			referenceType: "payment_request",
			expiryTime: "2021-02-17T06:31:46.358Z"
		}

		it("should ensure case of referenceType", function() {
			const qr = fromQrDTO(dto);

			assertThat(qr.referenceType, is("PAYMENT_REQUEST"));
		});

		it("should parse date of expiry time", function() {
			const qr = fromQrDTO(dto);

			assertThat(qr.expiryTime, is(instanceOf(Date)));
		});
	});
});
