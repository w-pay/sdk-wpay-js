/**
 * The JSON response structure of the Initiate Card Capture endpoint.
 *
 * @category Model
 */
export interface InitiateCardCaptureResponse {
	/* The URL of an iframe. This iframe is used to capture a credit card number, expiry and CVV. */
	cardCaptureURL: string;

	/* Container reference in the transaction logs. This number uniquely identifies the transaction in the container. */
	transactionRef: string;
}
