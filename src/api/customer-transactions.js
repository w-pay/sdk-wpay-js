"use strict";

const list = (
	client,
	paymentRequestId,
	page,
	pageSize,
	endTime,
	startTime
) => Promise.resolve();

const getById = (client, transactionId) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerTransactions').CustomerTransactionsApi} */
	return {
		list: list(client),
		getById: getById(client)
	};
}
