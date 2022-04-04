"use strict";

exports.GiftcardsBalanceRequest = () => ({
	giftCards: [
		{
			cardNumber: "6280003090926286519",
			pinCode: "9101"
		},
		{
			cardNumber: "6280005550028790195",
			pinCode: "4697"
		}
	]
});

exports.GiftcardsBalanceResponseDTO = () => ({
	giftCardBalances: [
		{
			cardNumber: "6280003090920742517",
			paymentInstrumentId: "81054",
			balance: 333.38,
			expiryDay: "31",
			expiryMonth: "03",
			expiryYear: "2018",
			expired: false
		}
	]
});

exports.TokenizeGiftcardRequest = () => ({
	cardNumber: "6280003090920742517",
	pinCode: "3196",
	primary: true,
	save: true
});

exports.TokenizeGiftcardResponseDTO = () => ({
	giftCard: {
		paymentInstrumentId: "81054",
		status: "UNVERIFIED_PERSISTENT",
		lastUpdated: "2017-10-26T06:35:09.083Z",
		lastUsed: "2017-10-12T02:25:49.770Z",
		primary: true,
		allowed: true,
		programName: "WISH Gift Card",
		cardSuffix: "2517"
	},
	balance: 333.4,
	expiryDay: "31",
	expiryMonth: "03",
	expiryYear: "2018",
	expired: false
});
