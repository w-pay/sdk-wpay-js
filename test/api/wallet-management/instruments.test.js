"use strict";

const { assertThat, is, throws } = require("hamjest");
const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");
const { StubApiClient } = require("../../stub-api-client");
const { requiredParameterError } = require("../../matchers/required-parameters");
const { v4: uuid } = require("uuid");
const { ImportPaymentInstrumentsResponseDTO } = require("../../data/wallet-management/ImportPaymentInstrumentsResponse");
const { ImportPaymentInstrumentsRequestDTO } = require("../../data/wallet-management/ImportPaymentInstrumentsRequest");
const { VerifyPaymentInstrumentsResponseDTO } = require("../../data/wallet-management/VerifyPaymentInstrumentsResponse");
const { VerifyPaymentInstrumentsRequestDTO } = require("../../data/wallet-management/VerifyPaymentInstrumentsRequest");
const { ListPaymentInstrumentsResponseDTO } = require("../../data/wallet-management/ListPaymentInstrumentsResponse");
const { ListPaymentInstrumentsRequestDTO } = require("../../data/wallet-management/ListPaymentInstrumentsRequest");
const apiFactory = require("../../../src/api/wallet-management/instruments");


describe("Instruments", function () {
	let apiClient;
	let api;

	function setResponse(response){
		apiClient.response = {
			data: response,
			meta: {}
		}
	}

	beforeEach(function () {
		apiClient = new StubApiClient();
		api = apiFactory(apiClient.client());
	});

    describe("import", function () {
        it("should set request params", async function () {
            await api.import(ImportPaymentInstrumentsRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/instruments/import"));
			assertThat(request.body, is(ImportPaymentInstrumentsRequestDTO()));
        });
		
        it("should return ImportPaymentInstrumentsResponseDTO", async function () {
			setResponse(ImportPaymentInstrumentsResponseDTO());
            const result = await api.import(ImportPaymentInstrumentsRequestDTO());
            assertThat(result.data, is(ImportPaymentInstrumentsResponseDTO()));
        });
	});

    describe("verify", function () {
		it("should set arequest params", async function () {
            await api.verify(VerifyPaymentInstrumentsRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/instruments/verify"));
			assertThat(request.body, is(VerifyPaymentInstrumentsRequestDTO()));
        });

        it("should return VerifyPaymentInstrumentsResponseDTO", async function () {
			setResponse(VerifyPaymentInstrumentsResponseDTO());
            const result = await api.verify(VerifyPaymentInstrumentsRequestDTO());
            assertThat(result.data, is(VerifyPaymentInstrumentsResponseDTO()));
        });
	});


    describe("getList", function () {
		it("should set arequest params", async function () {
            await api.getList();
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.GET));
            assertThat(request.url, is("/instruments"));
        });

        it("should return ListPaymentInstrumentsResponseDTO", async function () {
			setResponse(ListPaymentInstrumentsResponseDTO());
            const result = await api.getList();
            assertThat(result.data, is(ListPaymentInstrumentsResponseDTO()));
        });
	});

	describe("postList", function () {
		it("should set arequest params", async function () {
            await api.postList(ListPaymentInstrumentsRequestDTO());
            const request = apiClient.request;
    
            assertThat(request.method, is(HttpRequestMethod.POST));
            assertThat(request.url, is("/instruments"));
			assertThat(request.body, is(ListPaymentInstrumentsRequestDTO()));
        });

        it("should return ListPaymentInstrumentsResponseDTO", async function () {
			setResponse(ListPaymentInstrumentsResponseDTO());
            const result = await api.postList(ListPaymentInstrumentsRequestDTO());
            assertThat(result.data, is(ListPaymentInstrumentsResponseDTO()));
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
			assertThat(request.pathParams, is({paymentInstrumentId}));
		});

		it("should return TokenizeAndroidPayResponseDTO", async function () {
			setResponse({})
			const result = await api.delete(uuid());
            assertThat(result.data, is({}));
		});
	});
});