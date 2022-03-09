"use strict";

exports.termsAndConditionsDTO = () => ({
	termsAndConditionsAcceptances: [
		{
			type: "EVERYDAY_PAY",
			version: "1.0.0",
			timestamp: 1604284343175
		}
	]
});

exports.acceptTermsAndConditionsRequest = () => ({
	type: "EVERYDAY_PAY",
	version: "1.0.0"
});
