"use strict";

const { v4: uuid } = require("uuid");

exports.aNewPosPayload = () => ({
	schemaId: uuid(),
	payload: (function () {
		const payload = new Map();

		payload.set("posPayloadKey", "some value");

		return payload;
	})()
});

exports.posPayloadDTO = () => ({
	schemaId: uuid(),
	payload: {
		posPayloadKey: "some value"
	}
});

exports.aNewMerchantPayload = () => ({
	schemaId: uuid(),
	payload: (function () {
		const payload = new Map();

		payload.set("merchantPayloadKey", "some value");

		return payload;
	})()
});

exports.merchantPayloadDTO = () => ({
	schemaId: uuid(),
	payload: {
		merchantPayloadKey: "some value"
	}
});
