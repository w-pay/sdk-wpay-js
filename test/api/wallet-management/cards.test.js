"use strict";

const { assertThat, is } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");

const {
	InitiateCardCaptureRequest,
	InitiateCardCaptureResponseDTO
} = require("../../data/wallet-management/card-capture");
const apiFactory = require("../../../src/api/wallet-management/cards");

describe("CardCapture", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
		apiClient.response = InitiateCardCaptureResponseDTO();
	});

	describe("initCapture", function () {
		it("should set request params", async function () {
			await api.initCapture(InitiateCardCaptureRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/cards/initcapture"));
			assertThat(request.body, is(InitiateCardCaptureRequest()));
		});

		it("should init card capture", async function () {
			const result = await api.initCapture();

			assertThat(result, is(InitiateCardCaptureResponseDTO()));
		});
	});

	describe("guestInitCapture", function () {
		it("should set request params", async function () {
			await api.guestInitCapture(InitiateCardCaptureRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/guest/cards/initcapture"));
			assertThat(request.body, is(InitiateCardCaptureRequest()));
		});

		it("should init card capture", async function () {
			const result = await api.guestInitCapture();

			assertThat(result, is(InitiateCardCaptureResponseDTO()));
		});
	});
});
