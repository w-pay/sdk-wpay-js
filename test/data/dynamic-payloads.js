"use strict";

const { v4: uuid } = require("uuid");

exports.aNewPosPayload = () => ({
	schemaId: uuid(),
	payload: {
		posPayloadKey: "some value"
	}
});

exports.posPayloadDTO = () => ({
	schemaId: uuid(),
	payload: {
		posPayloadKey: "some value"
	}
});

exports.aNewMerchantPayload = () => ({
	schemaId: uuid(),
	payload: {
		merchantPayloadKey: "some value"
	}
});

exports.merchantPayloadDTO = () => ({
	schemaId: uuid(),
	payload: {
		merchantPayloadKey: "some value"
	}
});
