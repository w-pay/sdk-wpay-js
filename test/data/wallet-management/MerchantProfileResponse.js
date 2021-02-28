exports.MerchantProfileResponseDTO = () => ({
	allowedPaymentMethods: {
		giftCard: {
			allowedBins: ["628000"],
			serviceStatus: "ENABLED",
			pinAlwaysRequired: false
		},
		creditCard: {
			allowedNetworks: ["AMEX", "MASTERCARD", "JCB", "VISA", "DINERS"],
			allowedTransactionTypes: ["PREAUTH", "PURCHASE"],
			serviceStatus: "ENABLED"
		},
		payPal: {
			clientToken: "eyJ2ZXJzaW9uIjoyLCJhdXRob3Jpem=",
			serviceStatus: "ENABLED"
		},
		googlePay: {
			publicKey: "5HjfYVMvcLN3CakMj3yVzVlYAQ==",
			publicKeyHash: "7S7yCA0TpuZ6hoYrdMzZhMQ=",
			publicKeyExpiry: 1600491347369,
			merchantId: "11111",
			merchantName: "DUMMY",
			creditCard: {
				allowedNetworks: ["AMEX", "MASTERCARD", "VISA"],
				allowedTransactionTypes: ["PURCHASE", "PREAUTH"]
			},
			debitCard: {
				allowedNetworks: [],
				allowedTransactionTypes: ["PURCHASE", "PREAUTH"]
			},
			serviceStatus: "ENABLED"
		},
		applePay: {
			creditCard: {
				allowedNetworks: ["AMEX", "MASTERCARD", "VISA"],
				allowedTransactionTypes: ["PREAUTH", "PURCHASE"]
			},
			debitCard: {
				allowedNetworks: [],
				allowedTransactionTypes: ["PREAUTH", "PURCHASE"]
			},
			serviceStatus: "ENABLED"
		}
	}
});
