"use strict";

const { ChallengeResponseType } = require("../../src/model/enums");

exports.aChallengeResponse = () =>
	new TestChallengeResponse()

class TestChallengeResponse {
	constructor() {
		this.instrumentId = "abc123";
		this.type = ChallengeResponseType.PASSCODE;
		this.token = "fajkfafkaf";
		this.reference = "a reference";
	}
}
