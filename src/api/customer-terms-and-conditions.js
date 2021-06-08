"use strict";

const asyncToPromise = require("crocks/Async/asyncToPromise");
const identity = require("crocks/combinators/identity");
const pipeK = require("crocks/helpers/pipeK");

const { fromData } = require("../transformers/data");
const { requiredParameterError } = require("./api-errors");

const { HttpRequestMethod } = require("@api-sdk-creator/http-api-client");

// get :: HttpApiClient -> (String, String) -> Promise TermsAndConditionsAcceptances
const get = (client) => () => {
	return asyncToPromise(
		pipeK(
			client,
			fromData(identity)
		)({
			method: HttpRequestMethod.GET,
			url: "/instore/customer/termsandconditions/acceptance"
		})
	);
};

// accept :: HttpApiClient -> (AcceptTermsAndConditionsRequest) -> Promise void
const accept = (client) => (acceptTermsAndConditionsRequest) => {
	if (!acceptTermsAndConditionsRequest) {
		throw requiredParameterError("acceptTermsAndConditionsRequest");
	}

	return asyncToPromise(
		pipeK(client)({
			method: HttpRequestMethod.POST,
			url: "/instore/customer/termsandconditions/acceptance",
			body: acceptTermsAndConditionsRequest
		})
	);
};

module.exports = (client) => {
	/** @implements {import('../../types/api/CustomerTermsAndConditions').CustomerTermsAndConditionsApi} */
	return {
		get: get(client),
		accept: accept(client)
	};
};
