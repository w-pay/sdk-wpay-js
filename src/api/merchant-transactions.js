"use strict";

const list = (client, page, pageSize, endTime, startTime) => Promise.resolve();

const getById = (client, transactionId) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/MerchantTransactions').MerchantTransactionsApi} */
	return {
		list: list(client),
		getById: getById(client)
	};
}
