/**
 * The JSON response structure of the Import Payment InstrumentsApi endpoint.
 *
 * @category Model
 */
export interface ImportPaymentInstrumentsResponse {
	/* The IDM (Gigya) UID or merchant shopper id of the user. Do NOT use an email address! */
	uid: string;

	/* The merchant shopper id of the user. */
	shopperId: string;

	creditCards?: CreditCardResult[];
	payPal?: {
		/* The PayPalApi customer id. */
		customerId: string;

		/* The PayPalApi email id. */
		payPalId: string;

		/* The PayPalApi payment method token.*/
		paymentMethodToken: string;

		/* The import process result for the paypal instrument. */
		result: "OK" | "DUP" | "EXP" | "ERROR";

		/* The import process error message if "result" is "ERROR". Will be null if "result" is not "ERROR". */
		errorMessage?: {
			description: string;
		};
	};
}

interface CreditCardResult {
	/* WebPay reference in the transaction logs. This number uniquely identifies the transaction in WebPay. */
	transactionRef: string;

	/* The WebPay transaction timestamp. The timestamp format is ISO8601. */
	transactionTimestamp: string;

	/* The WebPay transaction type. */
	transactionType: string;

	/* The WebPay transaction response code. */
	transactionResponseCode: string;

	/* The WebPay transaction response text. */
	transactionResponseText: string;

	/* The merchant order number used in the WebPay transaction. */
	orderNumber: string;

	/* The bin (first 6 digits) of the credit card number used in the WebPay transaction. */
	bin: string;

	/* The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
	cardSuffix: string;

	/* The month of the expiry date of the credit card. */
	expiryMonth: string;

	/* The year of the expiry date of the credit card. */
	expiryYear: string;

	/* The amount of the WebPay transaction. */
	amount: number;

	/* The import process result for the credit card instrument. */
	result: "OK" | "DUP" | "EXP" | "ERROR";

	errorMessage: {
		description?: string;
	};
}
