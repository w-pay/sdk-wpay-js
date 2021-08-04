/**
 * Results of the gifting quote
 *
 * @category Model
 */
export interface DigitalPayGiftingQuoteResponse {
	/** Quote reference. Can be used as a reference when placing the actual order */
	quoteId: string;

	/** Face value of the gift card */
	subTotalAmount: number;

	/** Eligible discount amount. In case of no discounts, value will be 0 */
	discountAmount: number;

	/** Net amount payable */
	totalOrderAmount: number;

	/** Results of the gifting quote */
	orderItems: GiftingProductQuoteResponseItem;
}

interface GiftingProductQuoteResponseItem {
	/** Unique identifier of the design selected (assumed to be DIGITAL only currently) */
	designId: string;

	/** Face value of the gift card */
	amount: number;

	/** Sale price of the gift card */
	unitSalePrice: number;

	/** Total order price */
	totalSalePrice: number;

	/** For self use card, this can be any value between 1 and 10. For a gifting card, it must be 1 */
	quantity: number;

	/** If true its a gifting card, if false it is a self use card */
	isGifting: boolean;

	/** Australian mobile number of recipient. Only SMS delivery method is supported for gifting card */
	mobileNumber?: string;
}
