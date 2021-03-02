/* The JSON request structure of the Verify Payment InstrumentsApi endpoint. */
export interface VerifyPaymentInstrumentsRequest {
	/* A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system.*/
	clientReference: string;

	/* The step-up token is used to track additional credit card information (eg. CVV and expiry) attached to the payment instrument. It's only valid for a predefined time and if an expired step-up token is used during payment, the payment for that instrument will fail and the user will have to get a new step-up token before retrying the payment. A step-up token is returned in the response of a credit card iframe. This property is currently only required for credit card instruments and only if specific credit card information (eg. CVV and expiry) is required during payment. */
	paymentInstruments: PaymentInstrument[];

	/* Set to null to skip the fraud check. */
	fraudPayload?: {
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
	};
}

interface PaymentInstrument {
	/* The payment token. */
	paymentToken: string;

	/**
	 * The step-up token is used to track additional credit card information (eg. CVV and expiry) attached to the payment instrument.
	 * It's only valid for a predefined time and if an expired step-up token is used during payment,
	 * the payment for that instrument will fail and the user will have to get a new step-up token before retrying the payment.
	 * A step-up token is returned in the response of a credit card iframe.
	 * This property is currently only required for credit card instruments and only if specific credit card information (eg. CVV and expiry) is required during payment.
	 */
	stepUpToken: string;
}
