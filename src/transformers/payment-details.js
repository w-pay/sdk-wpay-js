"use strict";

// toSecondaryInstrument :: SecondaryPaymentInstrument -> Object
const toSecondaryInstrument = (instrument) => ({
	instrumentId: instrument.paymentInstrumentId,
	amount: instrument.amount
});

exports.toPaymentDetailsDTO = (
	primaryInstrument,
	secondaryInstruments,
	skipRollback,
	clientReference
) => {
	const dto = {
		primaryInstrumentId: primaryInstrument,
		secondaryInstruments: secondaryInstruments
			? secondaryInstruments.map(toSecondaryInstrument)
			: []
	};

	if (skipRollback) {
		dto.skipRollback = skipRollback;
	}

	if (clientReference) {
		dto.clientReference = clientReference;
	}

	return dto;
};
