/**
 * The JSON response structure of the GiftcardsApi Balance endpoint.
 *
 * @category Model
 */
export interface GiftcardsBalanceResponse {
	giftCardBalances: giftCardBalance[];
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
