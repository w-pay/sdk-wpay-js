"use strict";

const Assign = require("crocks/Assign");
const Async = require("crocks/Async");
const Result = require("crocks/Result");

const chain = require("crocks/pointfree/chain");
const compose = require("crocks/helpers/compose");
const constant = require("crocks/combinators/constant");
const curry = require("crocks/core/curry");
const either = require("crocks/pointfree/either");
const getProp = require("crocks/Maybe/getProp");
const isNil = require("crocks/predicates/isNil");
const map = require("crocks/pointfree/map");
const mreduce = require("crocks/helpers/mreduce");
const not = require("crocks/logic/not");
const objOf = require("crocks/helpers/objOf");
const option = require("crocks/pointfree/option");
const pipe = require("crocks/helpers/pipe");
const safe = require("crocks/Maybe/safe");
const sequence = require("crocks/pointfree/sequence");

const { applyFunctor } = require("@epistemology-factory/crocks-ext/helpers");

const {
	bearerToken,
	constantHeaders,
	createHeaders
} = require("@api-sdk-creator/http-api-client");

const { toApiAuthenticator } = require("./api-authenticator");
const {
	X_API_KEY,
	X_EVERYDAY_PAY_WALLET,
	X_MERCHANT_ID,
	X_WALLET_ID
} = require("./header-names");

const { Wallet } = require("../../src/model");

const { getPropOrError } = require("../helpers/props");

/*
 * Turns an array of Result producing functions into a Result with an array of the results
 * of calling those functions with the input.
 */
// sequenceResults :: [ (a -> Result Error b) ] -> a -> Result Error [ b ]
const sequenceResults = (fns) => compose(sequence(Result), applyFunctor(fns));

// getHeaderOrError :: String -> String -> Object -> Result Error Object
const getHeaderOrError = curry((prop, headerName) =>
	compose(map(objOf(headerName)), getPropOrError(prop))
);

// getHeaderOrNothing :: String -> String -> Object -> Result Object
const getHeaderOrNothing = curry((prop, headerName) =>
	compose(Result.Ok, either(constant({}), objOf(headerName)), getProp(prop))
);

// everydayPayWalletHeader :: Object -> Result Object
const everydayPayWalletHeader = pipe(
	getProp("wallet"),
	either(constant("false"), (wallet) => (wallet === Wallet.EVERYDAY_PAY).toString()),
	compose(Result.Ok, objOf(X_EVERYDAY_PAY_WALLET))
);

// apiAuthenticatorToRequestHeaderFactory :: ApiAuthenticator -> RequestHeaderFactory
const apiAuthenticatorToRequestHeaderFactory = pipe(
	(authenticator) => Async.fromPromise(authenticator.authenticate.bind(authenticator)),
	bearerToken
);

// constantOptsToHeaders :: Object -> Result Error RequestHeaderFactory
const constantOptsToHeaders = pipe(
	sequenceResults([
		getHeaderOrError("apiKey", X_API_KEY),
		getHeaderOrNothing("walletId", X_WALLET_ID),
		getHeaderOrNothing("merchantId", X_MERCHANT_ID),
		everydayPayWalletHeader
	]),
	map(compose(constantHeaders, mreduce(Assign)))
);

// accessTokenToHeader :: Object -> Result RequestHeaderFactory
const accessTokenToHeader = pipe(
	compose(chain(safe(not(isNil))), getProp("accessToken")),
	map(compose(apiAuthenticatorToRequestHeaderFactory, toApiAuthenticator)),
	option(() => Async.Resolved({})),
	Result.Ok
);

/**
 * Creates a function that when executed will create headers for a request.
 *
 * A function is returned because the access token might change for each request.
 *
 * @param {object} options WPay options
 */
// defaultHeaders :: Object -> Result Error RequestHeadersFactory
const defaultHeaders = pipe(
	sequenceResults([constantOptsToHeaders, accessTokenToHeader]),
	map(createHeaders)
);

module.exports = {
	defaultHeaders
};
