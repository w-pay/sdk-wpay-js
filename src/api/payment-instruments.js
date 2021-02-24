"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const identity = require("crocks/combinators/identity");
const pipeK = require("crocks/helpers/pipeK");

const { addHeaders, HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { everydayPayWalletHeader } = require("../headers/everyday-pay-header");
const { fromData } = require("../transformers/data");
const { fromWalletContentsDTO } = require("../transformers/payment-instruments");
const { requiredParameterError } = require("./api-errors");

const list = (client) => (wallet) => {
	if (!wallet) {
		throw requiredParameterError("wallet");
	}

	return asyncToPromise(pipeK(
		addHeaders(everydayPayWalletHeader(wallet)),
		client,
		fromData(fromWalletContentsDTO)
	)({
		method: HttpRequestMethod.GET,
		url: "/customer/instruments",
	}))
}

const deleteInstrument = (client) => (instrument) => {
	if (!instrument) {
		throw requiredParameterError("instrument");
	}

	return asyncToPromise(pipeK(
		addHeaders(everydayPayWalletHeader(instrument.wallet)),
		client
	)({
		method: HttpRequestMethod.DELETE,
		url: "/customer/instruments/:paymentInstrumentId",
		pathParams: {
			paymentInstrumentId: instrument.paymentInstrumentId
		}
	}))
}

const initiateAddition = (client) => (instrument) => {
	if (!instrument) {
		throw requiredParameterError("instrument");
	}

	return asyncToPromise(pipeK(
		addHeaders(everydayPayWalletHeader(instrument.wallet)),
		client,
		fromData(identity)
	)({
		method: HttpRequestMethod.POST,
		url: "/customer/instruments",
		body: {
			data: {
				clientReference: instrument.clientReference
			},
			meta: {}
		}
	}))
}

module.exports = (client) => {
	/** @implements {import('../../types/api/PaymentInstruments').PaymentInstrumentsApi} */
	return {
		list: list(client),
		delete: deleteInstrument(client),
		initiateAddition: initiateAddition(client)
	};
}
