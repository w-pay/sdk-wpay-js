// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MerchantSchemas {}

/**
 * List of merchant schemas
 *
 * @category Model
 */
export interface MerchantSchemaSummaries extends MerchantSchemas {
	/** A list of currently valid schemas for this merchant */
	schemas: MerchantSchemaSummary[];
}

/**
 * Summary information about a {@link MerchantSchema}
 *
 * @category Model
 */
export interface MerchantSchemaSummary {
	/** The unique ID assigned to the schema */
	schemaId: string;

	/** The type of the schema e.g. pos, merchant */
	type: string;

	/** A description for the schema. */
	description?: string;
}

/**
 * Details about a particular schema
 *
 * @category Model
 */
export interface MerchantSchema {
	/** The schema content formatted according to JSON Schema standards */
	schema: { [key: string]: string };

	/** The type of the schema e.g. pos, merchant */
	type?: string;

	/** A description for the schema */
	description?: string;

	/** The timestamp when the schema was created */
	created?: Date;
}
