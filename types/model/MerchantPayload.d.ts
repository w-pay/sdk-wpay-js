/**
 * Payload provided by the merchant to support other types of messaging.
 *
 * @category Model
 */
export interface MerchantPayload {
	/** The ID of the previously configured schema that will be used to validate the contents of the payload */
	schemaId?: string;

	/** The contents of the message */
	payload: Map<string, any>;
}
