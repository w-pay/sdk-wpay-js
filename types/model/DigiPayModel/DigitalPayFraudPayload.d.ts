/**
 * Fraud check response
 *
 * @category Model
 */
export interface DigitalPayFraudPayload {
	/* The fraud check provider. */
	provider: string;

	/* The fraud check version. */
	version: string;

	/* The fraud check message format. */
	format: "ZIP_BASE_64_ENCODED" | "XML";

	/* The fraud check message format. */
	responseFormat: "ZIP_BASE_64_ENCODED" | "XML";

	/* The fraud check message. */
	message: string;
}
