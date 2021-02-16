"use strict";

const Assign = require("crocks/Assign");
const Async = require("crocks/Async");
const List = require("crocks/List");
const Result = require("crocks/Result");

const ap = require("crocks/pointfree/ap");
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

const { bearerToken, constantHeaders, createHeaders } = require("@sdk-creator/http-api-client");

const { toApiAuthenticator } = require("./api-authenticator");
const { X_API_KEY, X_MERCHANT_ID, X_WALLET_ID } = require("./header-names");

const { getPropOrError } = require("../helpers/props");

// TODO: there might be a better way to do this
// ap :: Applicative m => m (a -> b) -> m a ->  m b
const applyFunctions = flip(ap);

// getHeaderOrError :: String -> String -> Result Error Assign
const getHeaderOrError = curry((prop, headerName) =>
	pipe(getPropOrError(prop), map(pipe(objOf(headerName), Assign)))
)

// getHeaderOrError :: String -> String -> Result Assign
const getHeaderOrNothing = curry((prop, headerName) =>
	pipe(getProp(prop), either(constant({}), objOf(headerName)), Assign, Result.of)
)

// safeGetProp :: String -> Object -> Maybe a
const safeGetProp = (prop) =>
	pipe(
		getProp(prop),
		chain(safe(not(isNil)))
	)

// apiAuthenticatorToRequestHeaderFactory :: ApiAuthenticator -> RequestHeaderFactory
const apiAuthenticatorToRequestHeaderFactory =
	pipe(
		(authenticator) => Async.fromPromise(authenticator.authenticate.bind(authenticator)),
		bearerToken
	)

// constantOptsToHeaders :: Object -> Result Error RequestHeaderFactory
const constantOptsToHeaders =
	pipe(
		List.of,
		applyFunctions(List([
			pipe(getHeaderOrError("apiKey", X_API_KEY)),
			pipe(getHeaderOrNothing("walletId", X_WALLET_ID)),
			pipe(getHeaderOrNothing("merchantId", X_MERCHANT_ID))
		])),
		fold,
		map(valueOf),
		map(constantHeaders),
	)

// accessTokenToHeader :: Object -> Result RequestHeaderFactory
const accessTokenToHeader =
	pipe(
		safeGetProp("accessToken"),
		map(toApiAuthenticator),
		map(apiAuthenticatorToRequestHeaderFactory),
		option(() => Async.of({})),
		Result.of,
	)

/**
 * Creates a function that when executed will create headers for a request.
 *
 * A function is returned because the access token might change for each request.
 *
 * @param {object} options WPay options
 */
// defaultHeaders :: Object -> Result Error RequestHeadersFactory
const defaultHeaders =
	pipe(
		List.of,
		applyFunctions(List([
			constantOptsToHeaders,
			accessTokenToHeader
		])),
		sequence(Result.of),
		map(createHeaders),
	)

module.exports = {
	defaultHeaders
}
