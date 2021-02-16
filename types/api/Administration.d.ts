import { HealthCheck } from "../model";

/**
 * Can be used to perform Administration functions on the API
 *
 * @category API
 */
export interface AdministrationApi {
	/**
	 * Check the health/status of the API
	 */
	checkHealth(): Promise<HealthCheck>;
}
