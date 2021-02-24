"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const chain = require("crocks/pointfree/chain");
const map = require("crocks/pointfree/map");
const pipe = require("crocks/helpers/pipe");
const resultToAsync = require("crocks/Async/resultToAsync");

const { addHeaders, HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

const { getPropOrError } = require("../helpers/props");
const { everydayPayWalletHeader } = require("../headers/everyday-pay-header");
const { fromWalletContentsDTO } = require("../transformers/payment-instruments");
const { requiredParameterError } = require("./api-errors");

const list = (client) => (wallet) => {
	if (!wallet) {
		throw requiredParameterError("wallet");
	}

	return pipe(
		addHeaders(everydayPayWalletHeader(wallet)),
		chain(client),
		chain(pipe(
			getPropOrError("data"),
			map(fromWalletContentsDTO),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.GET,
		url: "/customer/instruments",
	})
}

const deleteInstrument = (client) => (instrument) => {
	if (!instrument) {
		throw requiredParameterError("instrument");
	}

	return pipe(
		addHeaders(everydayPayWalletHeader(instrument.wallet)),
		chain(client),
		asyncToPromise
	)({
		method: HttpRequestMethod.DELETE,
		url: "/customer/instruments/:paymentInstrumentId",
		pathParams: {
			paymentInstrumentId: instrument.paymentInstrumentId
		}
	})
}

const initiateAddition = (client) => (instrument) => {
	if (!instrument) {
		throw requiredParameterError("instrument");
	}

	return pipe(
		addHeaders(everydayPayWalletHeader(instrument.wallet)),
		chain(client),
		chain(pipe(
			getPropOrError("data"),
			resultToAsync
		)),
		asyncToPromise
	)({
		method: HttpRequestMethod.POST,
		url: "/customer/instruments",
		body: {
			data: {
				clientReference: instrument.clientReference
			},
			meta: {}
		}
	})
}

module.exports = (client) => {
	/** @implements {import('../../types/api/PaymentInstruments').PaymentInstrumentsApi} */
	return {
		list: list(client),
		delete: deleteInstrument(client),
		initiateAddition: initiateAddition(client)
	};
}
