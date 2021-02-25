/**
 * @category API
 */
export interface Cards {
	/**
	 * Get a credit card detials input iframe (URL) for the consumer. This API is rate limited to 10 requests per minute per shopper id.
	 *
	 * @param
	 */
	initCapture(
		initiateCardCaptureRequest: InitiateCardCaptureRequest
	): Promise<InitiateCardCaptureResponse>;

	/**
	 * Get a credit card detials input iframe (URL) for a guest user. This API is rate limited to 10 requests per minute per guest shopper id.
	 *
	 * @param
	 */
	guestInitCapture(
		initiateCardCaptureRequest: InitiateCardCaptureRequest
	): Promise<InitiateCardCaptureResponse>;
}

/**
 * The JSON request structure of the Initiate Card Capture endpoint.
 *
 * @category Model
 */
interface InitiateCardCaptureRequest {
	/* A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system. */
	clientReference: string;
}

/**
 * The JSON response structure of the Initiate Card Capture endpoint.
 *
 * @category Model
 */
interface InitiateCardCaptureResponse {
	/* The URL of an iframe. This iframe is used to capture a credit card number, expiry and CVV. */
	cardCaptureURL: string;

	/* Container reference in the transaction logs. This number uniquely identifies the transaction in the container. */
	transactionRef: string;
}
