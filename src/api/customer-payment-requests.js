"use strict";

const getById = (client, paymentRequestId) => Promise.resolve();

const getByQRCodeId = (client, qrCodeId) => Promise.resolve();

const makePayment = (
	client,
	paymentRequestId,
	primaryInstrument,
	secondaryInstruments,
	clientReference,
	challengeResponses
) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentRequests').CustomerPaymentRequestsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		makePayment: makePayment(client)
	};
}
