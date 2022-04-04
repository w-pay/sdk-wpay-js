/**
 * The JSON response structure of the List Payment InstrumentsApi endpoint.
 *
 * @category Model
 */
export interface ListPaymentInstrumentsResponse {
	creditCards: CreditCardDetails[];
	giftCards: GiftCardDetails[];
	payPal: PayPalDetails[];
	paymentAgreements: PaymentAgreementDetails[];
	/* Android Pay has been replaced by Google Pay. This property has been retained for backward compatibility and will always be null. */
	androidPay: null;
	googlePay: GooglePayDetails;
	applePay: ApplePayDetails;
}

interface CreditCardDetails {
	/* The credit card payment instrument id. */
	paymentInstrumentId: string;

	/* The credit card payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/* The status of the payment instrument in the container. */
	status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

	/* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated: string;

	/* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed: string;

	/* A flag to indicate if this payment instrument is the primary instrument in the container. */
	primary: boolean;

	/* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
	allowed: boolean;

	/* The year of the expiry date of the credit card. */
	expiryYear: string;

	/* The month of the expiry date of the credit card. */
	expiryMonth: string;

	/* The credit card scheme. */
	scheme: string;

	/* The suffix (last 4 digits) of the credit card number. */
	cardSuffix: string;

	/* A flag to indicate if the CVV of the credit card has been validated. */
	cvvValidated: boolean;

	/* The nickname of the credit card instrument in the container. */
	cardName: string;

	/* A flag to indicate if the credit card is expired. */
	expired: boolean;

	/* A flag to indicate if payments with this credit card requires a CVV check. */
	requiresCVV: boolean;

	/* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV. */
	updateURL: string;

	stepUp: {
		/* The type of the step up action. For credit cards this will be CAPTURE_CVV which identifies that the consumer must capture the CVV prior to payment. */
		type: string;

		/* A flag to indicate if this step up (action) is mandatory. */
		mandatory: boolean;

		/* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV or CVV only. The URL will automatically switch between expiry and CVV or CVV only endpoints based on the container requirement. */
		url: string;
	};
}

interface GiftCardDetails {
	/* The gift card payment instrument id. */
	paymentInstrumentId: string;

	/* The gift card payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/* The status of the payment instrument in the container. */
	status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

	/* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated: string;

	/* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed: string;

	/* A flag to indicate if this payment instrument is the primary instrument in the container. */
	primary: boolean;

	/* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
	allowed: boolean;

	/* The gift card program name. */
	programName: string;

	/* The suffix (last 4 digits) of the gift card number. */
	cardSuffix: string;
}

interface PayPalDetails {
	/* The paypal payment instrument id. */
	paymentInstrumentId: string;

	/* The paypal payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/* The status of the payment instrument in the container. */
	status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

	/* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated: string;

	/* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed: string;

	/* A flag to indicate if this payment instrument is the primary instrument in the container. */
	primary: boolean;

	/* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
	allowed: boolean;

	/* The PayPalApi email id. */
	payPalId: string;

	/* The PayPalApi customer id. */
	customerId: string;
}

interface PaymentAgreementDetails {
	/* The payment token of the payment agreement. The payment token is a unique identifier for the payment agreement. */
	paymentToken: string;

	/* The status of the payment agreement in the container. */
	status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

	/* The timestamp the payment agreement was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated: string;

	/* The timestamp the payment agreement was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed: string;

	/* A flag to indicate if this payment instrument is the primary instrument in the container. Not used for payment agreements. */
	primary: boolean;

	/* A flag to indicate if the merchant profile in the container allows the use of this payment agreement. */
	allowed: boolean;

	/* The payment agreement type. */
	type: "RECURRING" | "ADHOC" | "INSTALLMENT";

	/* The payment agreement payment instrument id that will be used for the charges. */
	paymentInstrumentId: string;

	/* The credit card scheme. */
	scheme?: string;

	/* The suffix (last 4 digits) of the credit card number. */
	cardSuffix?: string;

	/* The month of the expiry date of the credit card. */
	expiryMonth?: string;

	/* The year of the expiry date of the credit card. */
	expiryYear?: string;

	/* The payment agreement start date and time. The timestamp format is ISO8601. */
	startDate: string;

	/* The payment agreement end date and time. The timestamp format is ISO8601. */
	endDate: string;

	/* The payment agreement charge frequency. */
	chargeFrequency: "WEEKLY" | "FORTNIGHTLY" | "MONTHLY";

	/* The amount that will be charged at the frequency specified in the payment agreement. */
	chargeAmount: number;

	/* The current charge cycle number. */
	chargeCycle: number;

	/* A flag to indicate if the payment agreement is expired. */
	expired: boolean;

	/* The URL of the endpoint to use to update the payment agreement. */
	updateURL: string;

	stepUp?: {
		/* The type of the step up action. For payment agreements this will be CAPTURE_CVV which identifies that the consumer must capture the CVV prior to payment.*/
		type: string;

		/* A flag to indicate if this step up (action) is mandatory. */
		mandatory: boolean;

		/* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV or CVV only. The URL will automatically switch between expiry and CVV or CVV only endpoints based on the container requirement. */
		url: string;
	};
}

interface GooglePayDetails {
	/* The google pay payment instrument id. */
	paymentInstrumentId: string;

	/* The google pay payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/* The status of the payment instrument in the container. */
	status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

	/* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated: string;

	/* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed: string;

	/* A flag to indicate if this payment instrument is the primary instrument in the container. */
	primary: boolean;

	/* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
	allowed: boolean;

	/* A flag to indicate if the Google Pay token is expired. */
	expired: boolean;

	/* This object will only be present if the Google Pay token is expired. Check the 'expired' flag for this status. */
	stepUp?: {
		/* The type of the step up action. For google pay this will be REFRESH_TOKEN. */
		type: "REFRESH_TOKEN";

		/* A flag to indicate if this step up (action) is mandatory. */
		mandatory: boolean;

		/* The URL of the endpoint to use to update the google pay token. */
		url: string;
	};
}

interface ApplePayDetails {
	/* The apple pay payment instrument id. */
	paymentInstrumentId: string;

	/* The apple pay payment token. The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/* The status of the payment instrument in the container. */
	status: "UNVERIFIED_PERSISTENT" | "VERIFIED";

	/* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
	lastUpdated: string;

	/* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
	lastUsed: string;

	/* A flag to indicate if this payment instrument is the primary instrument in the container. */
	primary: boolean;

	/* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
	allowed: boolean;
	stepUp: {
		/* The type of the step up action. For apple pay this will be REFRESH_TOKEN. */
		type: string;

		/* A flag to indicate if this step up (action) is mandatory. */
		mandatory: boolean;

		/* The URL of the endpoint to use to update the apple pay token. */
		url: string;
	};
}
