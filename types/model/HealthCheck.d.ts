/**
 * Result of checking the health of the API server
 *
 * @category Model
 */
export interface HealthCheck {
	/** Health check result */
	result: HealthCheckStatus;
}

/**
 * Possible health states that the API server can be in.
 *
 * @category Model
 */
export enum HealthCheckStatus {
	/** The API server is healthy */
	SUCCESS = "SUCCESS"
}
