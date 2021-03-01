/**
 * The JSON request structure of the List Payment InstrumentsApi endpoint.
 *
 * @category Model
 */

export interface ListPaymentInstrumentsRequest {
	/* The IDM (Gigya) UID or merchant shopper id of the user. Do NOT use an email address! */
	uid: string;
	/* The merchant shopper id of the user. */
	shopperId: string;
}
