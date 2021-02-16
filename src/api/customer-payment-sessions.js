"use strict";

const getById = (client, paymentSessionId) => Promise.resolve();

const getByQRCodeId = (client, qrCodeId) => Promise.resolve();

const update = (client, paymentSessionId, session) => Promise.resolve();

const deletePayment = (client, paymentSessionId) => Promise.resolve();

const preApprove = (
	client,
	paymentSessionId,
	primaryInstrument,
	secondaryInstruments,
	clientReference,
	challengeResponses
) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerPaymentSessions').CustomerPaymentSessionsApi} */
	return {
		getById: getById(client),
		getByQRCodeId: getByQRCodeId(client),
		update: update(client),
		delete: deletePayment(client),
		preApprove: preApprove(client)
	};
}
