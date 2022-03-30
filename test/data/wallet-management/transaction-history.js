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

exports.TransactionHistoryResponseDTO = () => ({
	returned: 2,
	total: 6,
	transactions: [
		{
			transactionType: "PURCHASE",
			transactionRef: "1000000000671560",
			transactionTimestamp: "2017-11-08T05:06:57.513Z",
			applicationRef: "T5ESYRPWJKPHF54",
			applicationName: "WowOnline",
			clientReference: "T5ESYRPWJKPHF54",
			orderNumber: "20170505090",
			bin: "5468",
			network: "MASTERCARD",
			cardSuffix: "6106",
			amount: 20.5,
			comment: "",
			paymentInstrumentType: "CREDIT_CARD"
		},
		{
			transactionType: "PURCHASE",
			transactionRef: "1000000000670623",
			transactionTimestamp: "2017-11-07T02:38:27.677Z",
			applicationRef: "95ORIO45ZMD4ZRF",
			applicationName: "WowOnline",
			clientReference: "95ORIO45ZMD4ZRF",
			orderNumber: "20171107051",
			bin: null,
			network: "GIFT_CARD",
			cardSuffix: null,
			amount: 1,
			comment: "",
			paymentInstrumentType: "GIFT_CARD"
		}
	]
});
