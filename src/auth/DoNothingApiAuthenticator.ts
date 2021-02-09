import { ApiAuthenticator } from "./ApiAuthenticator";

export class DoNothingApiAuthenticator implements ApiAuthenticator<null> {
	authenticate(): Promise<null> {
		return Promise.resolve(null);
	}
}
