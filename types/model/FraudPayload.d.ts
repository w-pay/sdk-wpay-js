/**
 * Digital Pay Fraud Payload, set to null to skip the fraud check.
 *
 * @category Model
 */
 export interface FraudPayload {
	/** The fraud check message */
    message: string;
    /** The fraud check provider. */
    provider: string;
    /** The fraud check message format */
    format: FraudPayloadFormat;
    /** The fraud check response message format */
    responseFormat: FraudPayloadFormat;
    /** The fraud check version */
    version: string;
}

/**
 * Possible fraud payload formats
 *
 * @category Model
 */
 export enum FraudPayloadFormat{
    /** ZIP BASE64 Formatting */
    ZipBase64Encoded = "ZIP_BASE_64_ENCODED",
    /** XML Formatting */
    Xml = "XML"
}
