/**
 * Payload describing the specific POS system.
 *
 * @category Model
 */
// TODO: Consider removing in favour of DynamicPayload
export interface PosPayload {
	/** The ID of the previously configured schema that will be used to validate the contents of the payload */
	schemaId?: string;

	/** The contents of the message */
	payload: any;
}
