/**
 * @category API
 */
export interface Giftcards {
	/**
	 * Create a paymment intrument id for a provided gift card.
	 *
	 * @param
	 */
	tokenize(tokenizeGiftcardRequest: TokenizeGiftcardRequest): Promise<TokenizeGiftcardResponse>;

	/**
	 * Get the balance and expiryinfo for the provided gift cards. This API is rate limited to 5 requests per minute per shopper id.
	 *
	 * @param
	 */
	balance(giftcardsBalanceRequest: GiftcardsBalanceRequest): Promise<GiftcardsBalanceResponse>;
}

/**
 * The JSON request structure of the Giftcards Balance endpoint.
 *
 * @category Model
 */
interface GiftcardsBalanceRequest {
	/* Use this array if the endpoint is being called with "cardNumber" and "pinCode" request properties. */
	giftCards: GiftCard[];
	/* Use this array if the endpoint is being called with "paymentInstrumentId" request properties. */
	giftCardInstruments: GiftCardInstrument[];
}

/**
 * The JSON response structure of the Giftcards Balance endpoint.
 *
 * @category Model
 */
interface GiftcardsBalanceResponse {
	giftCardBalances: giftCardBalance[];
}

interface GiftCard {
	/* The gift card number. */
	cardNumber: string;

	/* The gift card pin code. */
	pinCode: string;
}

interface GiftCardInstrument {
	/* The gift card payment instrument id. */
	paymentInstrumentId: string;
}

interface giftCardBalance {
	/* The gift card number. This property will only be returned if the endpoint was called with the "cardNumber" and "pinCode" request properties. */
	cardNumber: string;

	/* The gift card payment instrument id. This property will only be returned if the endpoint was called with the "paymentInstrumentId" request property. */
	paymentInstrumentId: string;

	/* The current available balance of the gift card. */
	balance: number;

	/*  The day of the expiry date of the gift card. */
	expiryDay: string;

	/* The month of the expiry date of the gift card. */
	expiryMonth: string;

	/* The year of the expiry date of the gift card. */
	expiryYear: string;

	/* A flag to indicate if the gift card is expired. */
	expired: boolean;
}

/**
 * The JSON request structure of the Tokenize Giftcard endpoint.
 *
 * @category Model
 */
interface TokenizeGiftcardRequest {
	/* The gift card number. */
	cardNumber: string;

	/* The gift card pin code. */
	pinCode: string;

	/* A flag to indicate if this payment instrument has to be set as the primary instrument. */
	primary: boolean;

	/* A flag to indicate if this payment instrument has to be saved in the container or tokenized for one-off use. */
	save: boolean;
}

/**
 * The JSON response structure of the Tokenize Giftcard endpoint.
 *
 * @category Model
 */
interface TokenizeGiftcardResponse {
	/* The current available balance of the gift card. */
	giftCard: {
		/* The new payment instrument id to be used for payments. */
		paymentInstrumentId: string;

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
	};

	balance: number;

	/* The day of the expiry date of the gift card. */
	expiryDay: string;

	/* The month of the expiry date of the gift card. */
	expiryMonth: string;

	/* The year of the expiry date of the gift card. */
	expiryYear: string;

	/* A flag to indicate if the gift card is expired. */
	expired: boolean;
}
