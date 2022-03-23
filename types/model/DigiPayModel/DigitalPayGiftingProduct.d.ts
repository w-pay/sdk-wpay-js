/**
 * Gift card product summary data
 *
 * @category Model
 */
export interface DigitalPayGiftingProduct {
	/** Unique identifier assigned to gift card program */
	productId: string;

	/** Display name of the gift card program */
	name: string;

	/** The manner in which the barcode is displayed for optical recognition (can be used to drive CX experience flows) */
	barCodeType: "PAN" | "GTIN";

	/** The timestamp the gift card program was last updated. */
	lastUpdateDateTime: Date;

	/** The aesthectic design of a gift card product */
	defaultDesign: GiftingProductDesign;

	/** A discount offered for a gift card product */
	discountOffered?: GiftingProductDiscount;
}

export interface GiftingProductDesign {
	/** Unique (within the scope of designType) identifier of the aesthectic design of the gift card */
	designId: string;

	/** Format of the design (note that different design types have different unique IDs) */
	designType: "DIGITAL" | "PHYSICAL";

	/** URL to the image for the gift card design */
	imageUrl: string;
}

export interface GiftingProductDiscount {
	/** Unique identifier of the discount */
	discountId: string;

	/** Display description of the discount */
	description: string;

	/** Percentage discount offered on the gift card */
	percentageDiscount: number;

	/** The start date of the offered discount. */
	startDate?: Date;

	/** The end date of the offered discount. */
	endDate?: Date;
}

export interface DigitalPayGiftingProducts {
	products: DigitalPayGiftingProduct[];
}
