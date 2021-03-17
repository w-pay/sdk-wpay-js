import { Wallet } from "../Wallet";

/**
 * The JSON request structure of the Delete Wallet endpoint.
 *
 * @category Model
 */
export interface WalletDeleteRequest {
	/** Which wallet to remove the instrument from */
	wallet: Wallet;

	/** The IDM (Gigya) UID or merchant shopper id of the user. Do NOT use an email address! */
	uid: string;

	/** The merchant shopper id of the user. */
	shopperId: string;
}
