"use strict";

const Assign = require("crocks/Assign");
const Async = require("crocks/Async");
const Result = require("crocks/Result");

const applyTo = require("crocks/combinators/applyTo");
const chain = require("crocks/pointfree/chain");
const constant = require("crocks/combinators/constant");
const curry = require("crocks/core/curry");
const either = require("crocks/pointfree/either");
const flip = require("crocks/combinators/flip");
const fold = require("crocks/pointfree/fold");
const getProp = require("crocks/Maybe/getProp");
const isNil = require("crocks/predicates/isNil");
const map = require("crocks/pointfree/map");
const not = require("crocks/logic/not");
const objOf = require("crocks/helpers/objOf");
const option = require("crocks/pointfree/option");
const pipe = require("crocks/helpers/pipe");
const safe = require("crocks/Maybe/safe");
const sequence = require("crocks/pointfree/sequence");
const valueOf = require("crocks/pointfree/valueOf");

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
 * While `map` is very handy in that it will take a function and apply it to a value, what
 * happens when we want to take an array of functions and apply them to a value?
 *
 * Because Array is a Functor (as it has a `map` method) we can take the array and apply it
 * to a given value returning a new array with the results.
 *
 * `applyFunctor` can be used with any Functor without needing the Functor to be an Applicative
 * or needing to lift the value into a Functor first; as is needed when applying an Applicative
 * to a value.
 */
// applyFunctor :: Functor f => f (a -> b) -> a -> f b
const applyFunctor = flip(pipe(applyTo, map));

// getHeaderOrError :: String -> String -> Object -> Result Error Assign
const getHeaderOrError = curry((prop, headerName) =>
	pipe(getPropOrError(prop), map(pipe(objOf(headerName), Assign)))
);

// getHeaderOrNothing :: String -> String -> Object -> Result Assign
const getHeaderOrNothing = curry((prop, headerName) =>
	pipe(getProp(prop), either(constant({}), objOf(headerName)), Assign, Result.of)
);

// everydayPayWalletHeader :: Object -> Result Assign
const everydayPayWalletHeader = pipe(
	getProp("wallet"),
	either(constant("false"), (wallet) => (wallet === Wallet.EVERYDAY_PAY).toString()),
	objOf(X_EVERYDAY_PAY_WALLET),
	Assign,
	Result.of
);

// safeGetProp :: String -> Object -> Maybe a
const safeGetProp = (prop) => pipe(getProp(prop), chain(safe(not(isNil))));

// apiAuthenticatorToRequestHeaderFactory :: ApiAuthenticator -> RequestHeaderFactory
const apiAuthenticatorToRequestHeaderFactory = pipe(
	(authenticator) => Async.fromPromise(authenticator.authenticate.bind(authenticator)),
	bearerToken
);

// constantOptsToHeaders :: Object -> Result Error RequestHeaderFactory
const constantOptsToHeaders = pipe(
	applyFunctor([
		pipe(getHeaderOrError("apiKey", X_API_KEY)),
		pipe(getHeaderOrNothing("walletId", X_WALLET_ID)),
		pipe(getHeaderOrNothing("merchantId", X_MERCHANT_ID)),
		pipe(everydayPayWalletHeader)
	]),
	fold,
	map(valueOf),
	map(constantHeaders)
);

// accessTokenToHeader :: Object -> Result RequestHeaderFactory
const accessTokenToHeader = pipe(
	safeGetProp("accessToken"),
	map(toApiAuthenticator),
	map(apiAuthenticatorToRequestHeaderFactory),
	option(() => Async.of({})),
	Result.of
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
	applyFunctor([constantOptsToHeaders, accessTokenToHeader]),
	sequence(Result.of),
	map(createHeaders)
);

module.exports = {
	defaultHeaders
};
