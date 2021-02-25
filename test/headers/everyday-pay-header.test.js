"use strict";

const { assertThat, equalTo, hasProperty } = require("hamjest");

const { Wallet } = require("../../src/model/enums");
const { everydayPayWalletHeader } = require("../../src/headers/everyday-pay-header");
const { X_EVERYDAY_PAY_WALLET } = require("../../src/headers/header-names");

describe("Everyday Pay Wallet Header", function () {
	it("should set header to true if wallet everyday pay", async function () {
		const result = await everydayPayWalletHeader(Wallet.EVERYDAY_PAY)().toPromise();

		assertThat(result, hasProperty(X_EVERYDAY_PAY_WALLET, equalTo("true")));
	});

	it("should set header to false it wallet not everyday pay", async function () {
		const result = await everydayPayWalletHeader(Wallet.MERCHANT)().toPromise();

		assertThat(result, hasProperty(X_EVERYDAY_PAY_WALLET, equalTo("false")));
	});
});
