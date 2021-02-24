"use strict";

// toSecondaryInstrument :: SecondaryPaymentInstrument -> Object
const toSecondaryInstrument = (instrument) => ({
	instrumentId: instrument.paymentInstrumentId,
	amount: instrument.amount
});

exports.toPaymentDetailsDTO = (
	primaryInstrument,
	secondaryInstruments,
	clientReference,
	challengeResponses
) => {
	const dto = {
		primaryInstrumentId: primaryInstrument.paymentInstrumentId,
		secondaryInstruments: secondaryInstruments
			? secondaryInstruments.map(toSecondaryInstrument)
			: [],
		challengeResponses: challengeResponses ? challengeResponses : []
	}

	if (clientReference) {
		dto.clientReference = clientReference;
	}

	return dto;
}
