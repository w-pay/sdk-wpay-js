"use strict";

const resultToAsync = require("crocks/Async/resultToAsync");

const { getPropOrError } = require("../helpers/props");

// fromEncryptedMeta :: Object -> Async Error Object
const fromEncryptedMeta = resultToAsync(getPropOrError("meta"));

module.exports = {
	fromEncryptedMeta
};
