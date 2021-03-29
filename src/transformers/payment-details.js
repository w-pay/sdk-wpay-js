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
	const dto = {
		secondaryInstruments: secondaryInstruments
			? secondaryInstruments.map(toSecondaryInstrument)
			: []
	};

	if (primaryInstrument) {
		dto.primaryInstrumentId = primaryInstrument;
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
