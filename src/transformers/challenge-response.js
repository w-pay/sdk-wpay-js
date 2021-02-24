"use strict";

const mapProps = require("crocks/helpers/mapProps");

const { toUpperCase } = require("../helpers/props");

exports.toChallengeResponseDTO = (dto) => dto

exports.fromChallengeResponseDTO =
	mapProps({
		type: toUpperCase
	})
