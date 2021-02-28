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
			network: "GIFT_CARD",
			cardSuffix: "2517",
			amount: 1,
			paymentInstrumentType: "GIFT_CARD"
		}
	]
});
