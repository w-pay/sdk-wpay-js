import { InitiateCardCaptureRequest } from "../../model/WalletManagementModel/InitiateCardCaptureRequest";
import { InitiateCardCaptureResponse } from "../../model/WalletManagementModel/InitiateCardCaptureResponse";

/**
 * @category API
 */
export interface CardsApi {
	/**
	 * Get a credit card detials input iframe (URL) for the consumer. This API is rate limited to 10 requests per minute per shopper id.
	 *
	 * @param initiateCardCaptureRequest Detail of the card capture to recieve the iframe (URL) for.
	 */
	initCapture(
		initiateCardCaptureRequest: InitiateCardCaptureRequest
	): Promise<InitiateCardCaptureResponse>;

	/**
	 * Get a credit card detials input iframe (URL) for a guest user. This API is rate limited to 10 requests per minute per guest shopper id.
	 *
	 * @param initiateCardCaptureRequest Detail of the card capture to recieve the iframe (URL) for.
	 */
	guestInitCapture(
		initiateCardCaptureRequest: InitiateCardCaptureRequest
	): Promise<InitiateCardCaptureResponse>;
}
