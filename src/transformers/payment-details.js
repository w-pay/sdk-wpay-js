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
	clientReference,
	preferences
) => {
	const dto = {};

	if (primaryInstrument) {
		dto.primaryInstrumentId = primaryInstrument;
	}

	if (secondaryInstruments) {
		dto.secondaryInstruments = secondaryInstruments.map(toSecondaryInstrument);
	}

	if (skipRollback) {
		dto.skipRollback = skipRollback;
	}

	if (clientReference) {
		dto.clientReference = clientReference;
	}

	if (preferences) {
		dto.preferences = preferences;
	}

	return dto;
};
