"use strict";

exports.aNewPosPayload = () =>
	new TestPayload();

exports.aNewMerchantPayload = () =>
	new TestPayload();

class TestPayload {
	constructor() {
		this.schemaId = "abc123";
		this.payload = new Map();
	}
}
