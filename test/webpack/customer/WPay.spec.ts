import { assertThat, defined, is } from "hamjest";

describe("WPay Customer global", function () {
	it("should have SDK factory ", function () {
		assertThat(WPay.createCustomerSDK, is(defined()));
	});
});
