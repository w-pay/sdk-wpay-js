import { assertThat, defined, is } from "hamjest";

describe("WPay Customer global", function () {
	it("should have SDK factory ", function() {
		assertThat(WPay.createCustomerSDK, is(defined()));
	});

	describe("headers", function() {
		it("should have ApiKeyRequestHeader exported", function() {
			assertThat(WPay.ApiKeyRequestHeader, is(defined()));
		});

		it("should have BearerTokenRequestHeader exported", function() {
			assertThat(WPay.BearerTokenRequestHeader, is(defined()));
		});

		it("should have RequestHeaderChain exported", function() {
			assertThat(WPay.RequestHeaderChain, is(defined()));
		});

		it("should have WalletIdRequestHeader exported", function() {
			assertThat(WPay.WalletIdRequestHeader, is(defined()));
		});
	});

	describe("auth", function() {
		it("should have DoNothingApiAuthenticator exported", function() {
			assertThat(WPay.DoNothingApiAuthenticator, is(defined()));
		});

		it("should have ProvidedTokenAuthenticator exported", function() {
			assertThat(WPay.ProvidedTokenAuthenticator, is(defined()));
		});

		it("should have StoringApiAuthenticator exported", function() {
			assertThat(WPay.StoringApiAuthenticator, is(defined()));
		});
	});
});
