import { CredentialsStore, HasAccessToken } from "../auth";
import { RequestHeaderFactory } from "./RequestHeaderFactory";

/**
 * Adds a 'Bearer' token to the request.
 */
export class BearerTokenRequestHeader<T extends HasAccessToken>
	implements RequestHeaderFactory, CredentialsStore<T>
{
	constructor(private token?: string) {}

	addHeaders(headers: Map<string, string>): void {
		if (!this.token) {
			throw new Error("Must set bearer token before calling API");
		}

		headers.set("Authorization", `Bearer ${this.token}`);
	}

	storeCredentials(credentials: T): void {
		this.token = credentials.accessToken;
	}
}
