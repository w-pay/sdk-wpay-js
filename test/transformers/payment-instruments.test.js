"use strict";

const { assertThat, is } = require("hamjest");

const { fromWalletContentsDTO } = require("../../src/transformers/payment-instruments");

const { walletContentsDTO } = require("../data/payment-instruments");
const { walletContentsFrom } = require("../matchers/payment-instrument-matchers");

describe("PaymentInstrument Transformers", function() {
	describe("WalletContent", function() {
		describe("from DTO", function() {
			it("should convert from dto", function() {
				const dto = walletContentsDTO();
				const result = fromWalletContentsDTO(dto);

				assertThat(result, is(walletContentsFrom(dto)));
			});
		});
	});
});
