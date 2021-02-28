"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const {
	MerchantProfileResponseDTO
} = require("../../data/wallet-management/MerchantProfileResponse");
const apiFactory = require("../../../src/api/wallet-management/merchants");

describe("Merchants", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: MerchantProfileResponseDTO(),
			meta: {}
		};
	});

	describe("profile", function () {
		it("should set request params", async function () {
			await api.profile();
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.GET));
			assertThat(request.url, is("/merchants/profile"));
		});

		it("should return TokenizeGiftcardResponseDTO", async function () {
			const result = await api.profile();
			assertThat(result.data, is(MerchantProfileResponseDTO()));
		});
	});
});
