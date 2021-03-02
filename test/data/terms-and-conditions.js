"use strict";

const termsAndConditionsDTO = () => ({
	termsAndConditionsAcceptances: [
		{
			type: "EVERYDAY_PAY",
			version: "1.0.0",
			timestamp: 1604284343175
		}
	]
});

const acceptTermsAndConditionsRequest = () => ({
	data: {
		type: "EVERYDAY_PAY",
		version: "1.0.0"
	},
	meta: {}
});

module.exports = {
	termsAndConditionsDTO,
	acceptTermsAndConditionsRequest
};
