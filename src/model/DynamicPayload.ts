/**
 * A payload of key/value pairs that is can be validated by a schema.
 */
export interface DynamicPayload {
	/** The ID of the previously configured schema that will be used to validate the contents of the payload. */
	schemaId?: string;

	/** The payload aligned to the supplied schema. */
	payload: Map<string, any>;
}
