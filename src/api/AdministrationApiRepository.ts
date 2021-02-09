import { HealthCheck } from "../model";

/**
 * Can be used to perform Administration functions on the API
 */
export interface AdministrationApiRepository {
	/**
	 * Check the health/status of the API
	 */
	checkHealth(): Promise<HealthCheck>;
}
