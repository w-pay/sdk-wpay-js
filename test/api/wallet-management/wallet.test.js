"use strict";

const { assertThat, hasProperties, is } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const {
	WalletDeleteResponseDTO
} = require("../../data/wallet-management/WalletDeleteResponse");
const { aWalletDeleteRequest } = require("../../data/wallet-management/WalletDeleteRequest");
const apiFactory = require("../../../src/api/wallet-management/wallet");
const { X_EVERYDAY_PAY_WALLET } = require("../../../src/headers/header-names");

describe("Wallet", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: WalletDeleteResponseDTO(),
			meta: {}
		};
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
					headers: {
						[X_EVERYDAY_PAY_WALLET]: "false"
					},
					body: is(aWalletDeleteRequest())
				})
			);
		});

		it("should return WalletDeleteResponseDTO", async function () {
			const result = await api.delete(aWalletDeleteRequest());

			assertThat(result.data, is(WalletDeleteResponseDTO()));
		});
	});
});
