/**
 * The JSON request structure of the Delete Wallet endpoint.
 *
 * @category Model
 */
export interface WalletDeleteRequest {
	/* The IDM (Gigya) UID or merchant shopper id of the user. Do NOT use an email address! */
	uid: string;

	/* The merchant shopper id of the user. */
	shopperId: string;
	example: 12345;
}
