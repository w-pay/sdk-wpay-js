import { assertThat, defined, is } from "hamjest";

describe("WPay Merchant global", function () {
	it("should have SDK factory ", function() {
		assertThat(WPay.createMerchantSDK, is(defined()));
	});
});
