class TestCustomerUpdatePaymentSessionRequest {
	constructor() {
		this.customerInfo = new TestUpdatePaymentSessionRequestPayload();
	}
}

class TestMerchantUpdatePaymentSessionRequest {
	constructor() {
		this.paymentRequestId = "abc123";
		this.merchantInfo = new TestUpdatePaymentSessionRequestPayload();
	}
}

class TestUpdatePaymentSessionRequestPayload {
	constructor() {
		this.schemaId ="abc123";
		this.payload = new Map();
	}
}

module.exports = {
	TestCustomerUpdatePaymentSessionRequest,
	TestMerchantUpdatePaymentSessionRequest
}
