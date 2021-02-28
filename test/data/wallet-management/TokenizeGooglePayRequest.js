exports.TokenizeGooglePayRequestDTO = () => ({
	instrumentType: "AMEX",
	comment: "AMEX-5232",
	tokenData:
		'{\\"protocolVersion\\":\\"ECv2\\",\\"signature\\":\\"MEQCIBec51ti5KFs==\\",\\"intermediateSigningKey\\":{\\"signatures\\":[\\"MEUCIEvA6rkOlThv=\\"],\\"signedKey\\":\\"{\\\\\\"keyValue\\\\\\":\\\\\\"MFkwEwYHKoZIzj0CAQYI\\\\\\",\\\\\\"keyExpiration\\\\\\":\\\\\\"1601448494595\\\\\\"}\\"},\\"signedMessage\\":\\"{\\\\\\"encryptedMessage\\\\\\":\\\\\\"o7raQeRaPE8NxOQuZPro6u\\\\\\",\\\\\\"ephemeralPublicKey\\\\\\":\\\\\\"BMEuZ4HsiNh\\\\\\",\\\\\\"tag\\\\\\":\\\\\\"kfFQwoP5evLtDoh5fTq\\\\\\"}\\"}'
});
