"use strict";

/** @implements {import('../../types/api/DigitalPayApi').DigitalPayApi} */
module.exports = (client) => {
	return {
		applePay: require("./wallet-management/apple-pay")(client),
		cards: require("./wallet-management/cards")(client),
		giftcards: require("./wallet-management/gift-cards")(client),
		googlePay: require("./wallet-management/google-pay")(client),
		instruments: require("./wallet-management/instruments")(client),
		merchants: require("./wallet-management/merchants")(client),
		openPay: require("./digital-pay/openpay-payments")(client),
		paymentAgreements: require("./digital-pay/payment-agreements")(client),
		payments: require("./digital-pay/payments")(client),
		paypal: require("./wallet-management/paypal")(client),
		transactions: require("./wallet-management/transactions")(client),
		wallet: require("./wallet-management/wallet")(client)
	};
};
