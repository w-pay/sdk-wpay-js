const { assertThat, is } = require("hamjest");

const { fromQrDTO, toQrDTO } = require("../../src/transformers/qr-code");

const { aQRCode, qrCodeDTO } = require("../data/qr-code");
const { isoStringFrom } = require("../matchers/date-matchers");
const { qrCodeFrom } = require("../matchers/qr-code-matchers");

describe("QR code transformers", function() {
	describe("to DTO", function() {
		it("should serialise expiry time", function() {
			const qrCode = aQRCode();
			const dto = toQrDTO(qrCode);

			assertThat(dto.expiryTime, is(isoStringFrom(qrCode.expiryTime)));
		});
	});

	describe("from DTO", function() {
		it("should convert dto to qr code", function() {
			const dto = qrCodeDTO();

			assertThat(fromQrDTO(dto), is(qrCodeFrom(dto)));
		});
	});
});
