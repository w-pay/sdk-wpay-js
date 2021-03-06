exports.TokenizePaypalRequest = () => ({
	nonce: "d5e2986b-ffd5-03af-1bee-ff2dc1e83a56",
	primary: true
});

exports.TokenizePaypalResponseDTO = () => ({
	payPal: {
		paymentInstrumentId: "90271",
		status: "UNVERIFIED_PERSISTENT",
		lastUpdated: "2017-10-26T04:56:25.046Z",
		primary: true,
		allowed: true,
		payPalId: "jane.doe@paypal.com",
		customerId: "690238314"
	}
});
