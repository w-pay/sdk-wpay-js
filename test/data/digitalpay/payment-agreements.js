"use strict";

const digitalPayPaymentAgreementDTO = () => ({
	transactionReceipt: "abc123def",
	paymentAgreement: digitalPayResponsePaymentAgreementDTO()
});

const digitalPayResponsePaymentAgreementDTO = () => ({
	type: "RECURRING",
	paymentInstrumentId: "90731",
	paymentInstrumentType: "card",
	scheme: "VISA",
	cardSuffix: "4405",
	expiryMonth: "11",
	expiryYear: "22",
	startDate: "2020-09-01T00:00:00.000Z",
	endDate: "2021-12-31T23:29:29.999Z",
	chargeFrequency: "MONTHLY",
	chargeAmount: 25.99
});

module.exports = {
	digitalPayPaymentAgreementDTO,
	digitalPayResponsePaymentAgreementDTO
};
