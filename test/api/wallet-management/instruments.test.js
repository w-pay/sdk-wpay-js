"use strict";

const { assertThat, is, throws } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { v4: uuid } = require("uuid");

const {
	ImportPaymentInstrumentsRequest,
	ImportPaymentInstrumentsResponseDTO,
	ListPaymentInstrumentsRequest,
	ListPaymentInstrumentsResponseDTO,
	VerifyPaymentInstrumentsRequest,
	VerifyPaymentInstrumentsResponseDTO
} = require("../../data/wallet-management/instruments");
const apiFactory = require("../../../src/api/wallet-management/instruments");

describe("Instruments", function () {
	let apiClient;
	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
	});

	describe("import", function () {
		beforeEach(function () {
			apiClient.response = ImportPaymentInstrumentsResponseDTO();
		});

		it("should set request params", async function () {
			await api.import(ImportPaymentInstrumentsRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/instruments/import"));
			assertThat(request.body, is(ImportPaymentInstrumentsRequest()));
		});

		it("should import instruments", async function () {
			const result = await api.import(ImportPaymentInstrumentsRequest());

			assertThat(result, is(ImportPaymentInstrumentsResponseDTO()));
		});
	});

	describe("verify", function () {
		beforeEach(function () {
			apiClient.response = VerifyPaymentInstrumentsResponseDTO();
		});

		it("should set request params", async function () {
			await api.verify(VerifyPaymentInstrumentsRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/instruments/verify"));
			assertThat(request.body, is(VerifyPaymentInstrumentsRequest()));
		});

		it("should verify instruments", async function () {
			const result = await api.verify(VerifyPaymentInstrumentsRequest());

			assertThat(result, is(VerifyPaymentInstrumentsResponseDTO()));
		});
	});

	describe("getList", function () {
		beforeEach(function () {
			apiClient.response = ListPaymentInstrumentsResponseDTO();
		});

		it("should set request params", async function () {
			await api.getList();
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.GET));
			assertThat(request.url, is("/instruments"));
		});

		it("should list instruments", async function () {
			const result = await api.getList();

			assertThat(result, is(ListPaymentInstrumentsResponseDTO()));
		});
	});

	describe("postList", function () {
		beforeEach(function () {
			apiClient.response = ListPaymentInstrumentsResponseDTO();
		});

		it("should set request params", async function () {
			await api.postList(ListPaymentInstrumentsRequest());
			const request = apiClient.request;

			assertThat(request.method, is(HttpRequestMethod.POST));
			assertThat(request.url, is("/instruments"));
			assertThat(request.body, is(ListPaymentInstrumentsRequest()));
		});

		it("should list instruments", async function () {
			const result = await api.postList(ListPaymentInstrumentsRequest());

			assertThat(result, is(ListPaymentInstrumentsResponseDTO()));
		});
	});

	describe("delete", function () {
		it("should throw error if paymentInstrumentId is missing", async function () {
			assertThat(() => api.delete(), throws(requiredParameterError("paymentInstrumentId")));
		});

		it("should set request params", async function () {
			const paymentInstrumentId = uuid();
			await api.delete(paymentInstrumentId);

			const request = apiClient.request;
			assertThat(request.method, is(HttpRequestMethod.DELETE));
			assertThat(request.url, is("/instruments/:paymentInstrumentId"));
			assertThat(request.pathParams, is({ paymentInstrumentId }));
		});
	});
});
