import {
	MerchantSchema,
	MerchantSchemaSummaries,
	MerchantSchemaSummary,
	NewMerchantSchema
} from "../model";

/**
 * @category API
 */
export interface SchemasApi {
	/**
	 * Retrieve the list of currently usable schemas previously added for the merchant
	 */
	list(): Promise<MerchantSchemaSummaries>;

	/**
	 * Retrieve details for a specific schema
	 *
	 * @param schemaId The schema to retrieve
	 */
	getById(schemaId: string): Promise<MerchantSchema>;

	/**
	 * Create a new schema for the merchant
	 *
	 * @param schema The schema definition
	 */
	create(schema: NewMerchantSchema): Promise<MerchantSchemaSummary>;
}
