"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { InitiateCardCaptureResponseDTO } = require("../../data/wallet-management/InitiateCardCaptureResponse");
const { InitiateCardCaptureRequestDTO } = require("../../data/wallet-management/InitiateCardCaptureRequest");
const apiFactory = require("../../../src/api/wallet-management/cards");

describe("Cards", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = {
			data: InitiateCardCaptureResponseDTO(),
			meta: {}
		};
	});

    describe("initCapture", function () {
        it("should set request params", async function () {
            await api.initCapture(InitiateCardCaptureRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/cards/initcapture"));
            assertThat(request.body, is(InitiateCardCaptureRequestDTO()));
        });
    
        it("should return TokenizeGiftcardResponseDTO", async function () {
            const result = await api.initCapture();
            assertThat(result.data, is(InitiateCardCaptureResponseDTO()));
        });
	});

	describe("guestInitCapture", function () {
        it("should set request params", async function () {
            await api.guestInitCapture(InitiateCardCaptureRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/guest/cards/initcapture"));
            assertThat(request.body, is(InitiateCardCaptureRequestDTO()));
        });
    
        it("should return GiftcardsBalanceResponseDTO", async function () {
            const result = await api.guestInitCapture();
            assertThat(result.data, is(InitiateCardCaptureResponseDTO()));
        });
	});
});