import { assertThat, defined, equalTo, is, not, promiseThat, willBe } from "hamjest";
import { instance, mock, when } from "ts-mockito";

import {
	ApiAuthenticator,
	ApiTokenType,
	createCustomerSDK,
	createMerchantSDK,
	HasAccessToken,
	RequestHeadersFactory,
	WPayOptions,
	X_API_KEY
} from "../src";

import {
	StubApiRepository,
	StubWPayCustomerApiRepository,
	StubWPayMerchantApiRepository
} from "./ApiRepositoryStubs";

type StubApiRepositoryConstructor<R> = new (
	options: WPayOptions,
	headers: RequestHeadersFactory,
	authenticator: ApiAuthenticator<any>
) => R & StubApiRepository;

interface SDKFactoryForTests<R> {
	name: string;
	factory: (
		options: WPayOptions,
		token: ApiTokenType<any>,
		Repository: StubApiRepositoryConstructor<R>
	) => R;
	Api: StubApiRepositoryConstructor<R>;
}

interface TokenDetails extends HasAccessToken {
	expiry: number;
}

const options: WPayOptions = {
	apiKey: "123abc456",
	baseUrl: "/"
};

const AUTHORISATION = "Authorization";

const sdks: SDKFactoryForTests<any>[] = [
	{
		name: "WPay Customer",
		factory: createCustomerSDK,
		Api: StubWPayCustomerApiRepository
	},
	{
		name: "WPay Merchant",
		factory: createMerchantSDK,
		Api: StubWPayMerchantApiRepository
	}
];

describe("WPay SDKs", function () {
	sdks.forEach((sdk) => {
		const { factory, Api } = sdk;

		describe(`${sdk.name}`, function () {
			it("should pass options to Repository constructor", function () {
				const sdk = factory(options, "abc123", Api);

				assertThat(sdk.options, is(options));
			});

			it("should pass needed request header factories to Repository constructor", async function () {
				const mockAuthenticator = mock<ApiAuthenticator<HasAccessToken>>();
				when(mockAuthenticator.authenticate()).thenResolve({ accessToken: "abc123" });

				const sdk = factory(options, instance(mockAuthenticator), Api);
				await sdk.authenticate();

				const headers = sdk.headers.createHeaders();

				// we just care the headers are defined. As for what goes in the headers that is up to the
				// tests of the individual RequestHeaderFactory instances.
				assertThat(headers.get(X_API_KEY), is(defined()));
				assertThat(headers.get(AUTHORISATION), is(defined()));
			});

			// for unauthenticated endpoints
			it("should omit authorisation if no token provided", function () {
				const sdk = factory(
					options,
					null,
					StubWPayCustomerApiRepository
				) as StubWPayCustomerApiRepository;

				const headers = sdk.headers.createHeaders();

				assertThat(headers.get(AUTHORISATION), is(not(defined())));
			});

			it("should create SDK ApiAuthenticate wrapping provided token", async function () {
				const token = "abc1234def";

				const sdk = factory(options, token, StubWPayCustomerApiRepository);

				await promiseThat(sdk.authenticate(), willBe(equalTo({ accessToken: token })));
			});

			it("should automatically authenticate when wrapping provided token", function () {
				const sdk = factory(
					options,
					"abc1234def",
					StubWPayCustomerApiRepository
				) as StubWPayCustomerApiRepository;

				const headers = sdk.headers.createHeaders();

				assertThat(headers.get(AUTHORISATION), is(defined()));
			});

			it("should create SDK with ApiAuthenticator", async function () {
				const mockAuthenticator = mock<ApiAuthenticator<TokenDetails>>();
				const tokenDetails = {
					accessToken: "abc12345def",
					expiry: Date.now()
				};

				when(mockAuthenticator.authenticate()).thenResolve(tokenDetails);

				const sdk = factory(
					options,
					instance(mockAuthenticator),
					StubWPayCustomerApiRepository
				);

				await promiseThat(sdk.authenticate(), willBe(equalTo(tokenDetails)));
			});
		});
	});
});
