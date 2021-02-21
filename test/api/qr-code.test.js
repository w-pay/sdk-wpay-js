"use strict";

const {  assertThat, is, throws } = require("hamjest");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const apiFactory = require("../../src/api/qr-code");
const { QRCodePaymentReferenceType } = require("../../src/model/enums");

const { aQrCode } = require("../matchers/qr-code-matcher");
const { requiredParameterError } = require("../matchers/required-parameters");
const { StubApiClient } = require("../stub-api-client");

describe("QRCodeApi", function() {
	let apiClient;

	let api;

	beforeEach(function() {
		apiClient = new StubApiClient()

		api = apiFactory(apiClient.client());
	});

	describe("createPaymentRequestQRCode", function() {
		const details = {
			referenceId: "abc123",
			referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST
		};

		beforeEach(function() {
			apiClient.response = {
				data: {
					qrId: "abc123def",
					referenceId: "reference123",
					referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST,
					content: "http://foo.com/code",
					image: "fadsfadfdasfdasfadfads",
					expiryTime: "2021-02-17T06:31:46.358Z"
				},
				meta: {}
			}
		})

		it("should throw error if details missing", function() {
			assertThat(() => api.createPaymentRequestQRCode(), throws(requiredParameterError("details")));
		});

		it("should set request params", async function() {
			await api.createPaymentRequestQRCode(details);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.POST,
				url: "/merchant/qr",
				body: {
					data: details,
					meta: {}
				}
			}));
		});

		it("should create payment request QR code", async function() {
			const result = await api.createPaymentRequestQRCode(details);

			assertThat(result, is(aQrCode()));
		});
	});

	describe("getPaymentRequestQRCodeContent", function() {
		const qrCodeId = "bvfg345vsfgt";

		beforeEach(function() {
			apiClient.response = {
				data: {
					qrId: "abc123def",
					referenceId: "reference123",
					referenceType: QRCodePaymentReferenceType.PAYMENT_REQUEST,
					content: "http://foo.com/code",
					image: "fadsfadfdasfdasfadfads",
					expiryTime: "2021-02-17T06:31:46.358Z"
				},
				meta: {}
			}
		})

		it("should throw error if qrCodeId is missing", function() {
			assertThat(
				() => api.getPaymentRequestQRCodeContent(),
				throws(requiredParameterError("qrCodeId"))
			);
		});

		it("should set request params", async function() {
			await api.getPaymentRequestQRCodeContent(qrCodeId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.GET,
				url: "/merchant/qr/:qrId",
				pathParams: {
					qrId: qrCodeId
				}
			}))
		});

		it("should get payment request QR code", async function() {
			const result = await api.getPaymentRequestQRCodeContent(qrCodeId);

			assertThat(result, is(aQrCode()));
		});
	});

	describe("cancelPaymentQRCode", function() {
		const qrCodeId = "bvfg345vsfgt";

		it("should throw error if qrCodeId is missing", function() {
			assertThat(() => api.cancelPaymentQRCode(), throws(requiredParameterError("qrCodeId")));
		});

		it("should set request params", async function() {
			await api.cancelPaymentQRCode(qrCodeId);

			assertThat(apiClient.request, is({
				method: HttpRequestMethod.DELETE,
				url: "/merchant/qr/:qrId",
				pathParams: {
					qrId: qrCodeId
				}
			}));
		});
	});
});
