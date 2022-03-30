"use strict";

const { assertThat, hasProperties, is } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { aWalletDeleteRequest } = require("../../data/wallet-management/wallet-delete");
const apiFactory = require("../../../src/api/wallet-management/wallet");

describe("Wallet", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
	});

	describe("delete", function () {
		it("should set request params", async function () {
			await api.delete(aWalletDeleteRequest());
			const request = apiClient.request;

			assertThat(
				request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/wallet/delete",
					body: is(aWalletDeleteRequest())
				})
			);
		});
	});
});
