/**
 * @category API
 */
export interface Merchants {
	/**
	 * Get the current configuration set of the merchant. If this API is called without a valid access token it is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param
	 */
	profile(): Promise<MerchantProfileResponse>;
}

/**
 * The JSON response structure of the Merchant Profile endpoint.
 *
 * @category Model
 */
interface MerchantProfileResponse {
	allowedPaymentMethods: {
		/** The presence of this object in the response indicates that a gift card is an allowed payment method and instrument in the container for the relevant merchant. */
		giftCard: {
			/** The gift card bin numbers that are allowed for the relevant merchant. This does not indicate sub-bins, ie. exact gift card programs. */
			allowedBins: string[];

			/** This property indicates the status of the gift card service in the container. */
			serviceStatus: "ENABLED" | "DISABLED";

			/** Flag to indicate if the pin is always required for gift card transactions. */
			pinAlwaysRequired: boolean;
		};
		/** The presence of this object in the response indicates that a credit card is an allowed payment method and instrument in the container for the relevant merchant. */
		creditCard: {
			/** The allowed networks (schemes) for credit card transactions. */
			allowedNetworks: string[];

			allowedTransactionTypes: "PREAUTH" | "PURCHASE"[];

			/** This property indicates the status of the credit card service in the container. */
			serviceStatus: "ENABLED" | "DISABLED";
		};

		/** The presence of this object in the response indicates that paypal is an allowed payment method and instrument in the container for the relevant merchant. */
		paypal: {
			/** The paypal client token used for configuration and authorization of paypal transactions. */
			clientToken: string;

			/** This property indicates the status of the paypal service in the container. */
			serviceStatus: "ENABLED" | "DISABLED";
		};

		/* The presence of this object in the response indicates that google pay is an allowed payment method and instrument in the container for the relevant merchant. */
		googlePay: {
			/* The public key required by the Google Pay wallet. */
			publicKey: string;

			/* The public key hash required by the Google Pay wallet. */
			publicKeyHash: string;

			/* The expiry timestamp of the public key hash. The timestamp format is milliseconds since epoch. */
			publicKeyExpiry: number;

			/* The merchant id required by the Google Pay wallet. */
			merchantId: string;

			/* The merchant name required by the Google Pay wallet. */
			merchantName: string;

			creditCard: {
				/* The allowed networks (schemes) for credit card transactions. */
				allowedNetworks: string[];

				/* The allowed transaction types for credit card transactions. */
				allowedTransactionTypes: "PREAUTH" | "PURCHASE"[];
			};

			debitCard: {
				/* The allowed networks (schemes) for debit card transactions. */
				allowedNetworks: string[];
				/* The allowed transaction types for debit card transactions. */
				allowedTransactionTypes: "PREAUTH" | "PURCHASE"[];
			};
			/* This property indicates the status of the google pay service in the container. */
			serviceStatus: "ENABLED" | "DISABLED";
		};

		/* The presence of this object in the response indicates that apple pay is an allowed payment method and instrument in the container for the relevant merchant. */
		applePay: {
			creditCard: {
				/* The allowed networks (schemes) for debit card transactions. */
				allowedNetworks: string[];

				/* The allowed networks (schemes) for debit card transactions. */
				allowedTransactionTypes: "PREAUTH" | "PURCHASE"[];
			};
			debitCard: {
				/* The allowed networks (schemes) for debit card transactions. */
				allowedNetworks: string[];
				/* The allowed transaction types for debit card transactions. */
				allowedTransactionTypes: "PREAUTH" | "PURCHASE"[];
			};
			/* This property indicates the status of the apple pay service in the container. */
			serviceStatus: "ENABLED" | "DISABLED";
		};
	};
}
