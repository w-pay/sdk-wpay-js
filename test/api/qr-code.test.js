"use strict";

const { v4: uuid } = require("uuid");

const { assertThat, equalTo, hasProperties, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/qr-code");
const { QRCodePaymentReferenceType } = require("../../src/model/enums");

const { body, withData } = require("../matchers/request-body-matchers");
const { qrCodeDTO } = require("../data/qr-code");
const { qrCodeFrom } = require("../matchers/qr-code-matchers");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("QRCodeApi", function () {
	let apiClient;

	let api;

	beforeEach(function () {
		apiClient = new StubApiClient();

		api = apiFactory(apiClient.client());
	});

	describe("createPaymentRequestQRCode", function () {
		const details = {
			referenceId: uuid(),
			referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST
		};

		beforeEach(function () {
			apiClient.response = {
				data: qrCodeDTO(),
				meta: {}
			};
		});

		it("should throw error if details missing", function () {
			assertThat(
				() => api.createPaymentRequestQRCode(),
				throws(requiredParameterError("details"))
			);
		});

		it("should set request params", async function () {
			await api.createPaymentRequestQRCode(details);

			assertThat(
				apiClient.request,
				hasProperties({
					method: HttpRequestMethod.POST,
					url: "/instore/merchant/qr",
					body: is(body(withData(equalTo(details))))
				})
			);
		});

		it("should create payment request QR code", async function () {
			const result = await api.createPaymentRequestQRCode(details);

			assertThat(result, is(qrCodeFrom(apiClient.response.data)));
		});
	});

	describe("getPaymentRequestQRCodeContent", function () {
		const qrCodeId = uuid();

		beforeEach(function () {
			apiClient.response = {
				data: qrCodeDTO(),
				meta: {}
			};
		});

		it("should throw error if qrCodeId is missing", function () {
			assertThat(
				() => api.getPaymentRequestQRCodeContent(),
				throws(requiredParameterError("qrCodeId"))
			);
		});

		it("should set request params", async function () {
			await api.getPaymentRequestQRCodeContent(qrCodeId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.GET,
					url: "/instore/merchant/qr/:qrId",
					pathParams: {
						qrId: qrCodeId
					}
				})
			);
		});

		it("should get payment request QR code", async function () {
			const result = await api.getPaymentRequestQRCodeContent(qrCodeId);

			assertThat(result, is(qrCodeFrom(apiClient.response.data)));
		});
	});

	describe("cancelPaymentQRCode", function () {
		const qrCodeId = uuid();

		it("should throw error if qrCodeId is missing", function () {
			assertThat(() => api.cancelPaymentQRCode(), throws(requiredParameterError("qrCodeId")));
		});

		it("should set request params", async function () {
			await api.cancelPaymentQRCode(qrCodeId);

			assertThat(
				apiClient.request,
				is({
					method: HttpRequestMethod.DELETE,
					url: "/instore/merchant/qr/:qrId",
					pathParams: {
						qrId: qrCodeId
					}
				})
			);
		});
	});
});
