export interface GiftingProductOrderItem {
	/** Unique identifier of the design selected */
	designId: string;

	/** Face value of the gift card */
	amount: number;

	/** For self use card, this can be any value between 1 and 10. For a gifting card, it must be 1 */
	quantity: number;

	/** If true its a gifting card, if false it is a self use card */
	isGifting: boolean;

	/** For a gifting card, contains the recipient details */
	recipientDetails?: RecipientDetail;
}

interface RecipientDetail {
	/** Name of sender */
	toName: string;

	/** Name of recipient */
	fromName: string;

	/** Optional message to be sent as part of gift card delivery */
	message?: string;

	/** Optional image URL for personalisation purposes */
	imageUrl?: string;

	/** Australian mobile number of recipient. Only SMS delivery method is supported for gifting card */
	mobileNumber: string;
}
