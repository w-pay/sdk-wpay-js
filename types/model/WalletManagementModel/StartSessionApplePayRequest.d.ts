/**
 * The JSON request structure of the Start Session Apple Pay endpoint.
 *
 * @category Model
 */
export interface StartSessionApplePayRequest {
	/* This attribute is contained by the onvalidatemerchant event. Set this value to event.validationURL */
	validationUrl: string;
}
