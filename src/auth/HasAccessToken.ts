/**
 * Indicates that a model has an access token that can be used to prove that SDK is authenticated
 */
export interface HasAccessToken {
	/** An access token obtained from an authentication result */
	accessToken: string;
}
