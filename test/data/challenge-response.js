"use strict";

const { v4: uuid } = require("uuid");

const { ChallengeResponseType } = require("../../src/model/enums");

exports.aChallengeResponse = () => ({
	instrumentId: uuid(),
	type: ChallengeResponseType.PASSCODE,
	token: "fajkfafkaf",
	reference: "a reference"
});

exports.challengeResponseDTO = () => ({
	instrumentId: uuid(),
	type: ChallengeResponseType.PASSCODE.toLowerCase(),
	token: "fajkfafkaf",
	reference: "a reference"
});
