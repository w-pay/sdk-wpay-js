/**
 * Result of checking the health of the API server
 */
export interface HealthCheck {
	/** Health check result */
	result: HealthCheckStatus;
}

/**
 * Possible health states that the API server can be in.
 */
export enum HealthCheckStatus {
	/** The API server is healthy */
	SUCCESS = "SUCCESS"
}
