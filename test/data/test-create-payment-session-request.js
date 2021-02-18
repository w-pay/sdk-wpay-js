class TestCreatePaymentSessionRequest {
	constructor() {
		this.generateQR = true;
		this.timeToLivePaymentSession = 0;
		this.timeToLiveQR = 0;
		this.location = "somewhere";
		this.merchantInfo = new TestCreatePaymentSessionRequestPayload();
	}
}

class TestCreatePaymentSessionRequestPayload  {
	constructor() {
		this.schemaId = "abc123";
		this.payload = new Map();
	}
}

module.exports = {
	TestCreatePaymentSessionRequest,
	TestCreatePaymentSessionRequestPayload
}
