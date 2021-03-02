"use strict";

// toSecondaryInstrument :: SecondaryPaymentInstrument -> Object
const toSecondaryInstrument = (instrument) => ({
	instrumentId: instrument.paymentInstrumentId,
	amount: instrument.amount
});

exports.toPaymentDetailsDTO = (primaryInstrument, secondaryInstruments, clientReference) => {
	const dto = {
		primaryInstrumentId: primaryInstrument.paymentInstrumentId,
		secondaryInstruments: secondaryInstruments
			? secondaryInstruments.map(toSecondaryInstrument)
			: []
	};

	if (clientReference) {
		dto.clientReference = clientReference;
	}

	return dto;
};
