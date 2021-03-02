exports.TransactionHistoryRequestDTO = () => ({
	transactionTypes: ["PREAUTH", "PURCHASE"],
	paymentInstrumentIds: ["90731", "81054", "90271"],
	clientReference: "T5ESYRPWJKPHF54",
	transactionRef: "1000000000670621",
	orderNumber: "20170505090",
	startDate: "2017-01-01T00:00:00.000+1100",
	endDate: "2017-12-31T23:59:59.999+1100",
	maxRecords: 5
});
