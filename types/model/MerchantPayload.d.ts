/**
 * Payload provided by the merchant to support other types of messaging.
 *
 * @category Model
 */
// TODO: Consider removing in favour of DynamicPayload
export interface MerchantPayload {
	/** The ID of the previously configured schema that will be used to validate the contents of the payload */
	schemaId?: string;

	/** The contents of the message */
	payload: any;
}
