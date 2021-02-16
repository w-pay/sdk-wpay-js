"use strict";

const create = (client, request) => Promise.resolve();

const getById = (client, paymentSessionId) => Promise.resolve();

const update = (client, paymentSessionId, session) => Promise.resolve();

const deletePaymentSession = (client, paymentSessionId) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantPaymentSessions').MerchantPaymentSessionsApi} */
	return {
		create: create(client),
		getById: getById(client),
		update: update(client),
		delete: deletePaymentSession(client)
	};
}
