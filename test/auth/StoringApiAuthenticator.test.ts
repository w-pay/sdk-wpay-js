import { assertThat, instanceOf, is, isRejectedWith, promiseThat } from "hamjest";
import { anything, instance, mock, verify, when } from "ts-mockito";

import { ApiAuthenticator, CredentialsStore, StoringApiAuthenticator } from "../../src/auth";

describe("Storing Api Authenticator", function () {
	let mockAuthenticator: ApiAuthenticator<any>;
	let mockStore: CredentialsStore<any>;

	let authenticator: StoringApiAuthenticator<any>;

	beforeEach(function () {
		mockAuthenticator = mock<ApiAuthenticator<any>>();
		mockStore = mock<CredentialsStore<any>>();

		authenticator = new StoringApiAuthenticator<any>(
			instance(mockAuthenticator),
			instance(mockStore)
		);
	});

	it("should store the result of authenticating", async function () {
		const token = { token: "abc123" };

		when(mockAuthenticator.authenticate()).thenResolve(token);

		const result = await authenticator.authenticate();

		assertThat(result, is(token));
		verify(mockStore.storeCredentials(token)).once();
	});

	it("should store nothing if error thrown by delegate", async function () {
		when(mockAuthenticator.authenticate()).thenReject(new Error());

		await promiseThat(authenticator.authenticate(), isRejectedWith(instanceOf(Error)));

		verify(mockStore.storeCredentials(anything())).never();
	});
});
