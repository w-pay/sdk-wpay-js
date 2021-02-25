"use strict";

const { allOf, equalTo, hasProperty, instanceOf } = require("hamjest");

exports.requiredParameterError = (name) =>
	allOf(instanceOf(Error), hasProperty("message", equalTo(`'${name}' is mandatory`)));
