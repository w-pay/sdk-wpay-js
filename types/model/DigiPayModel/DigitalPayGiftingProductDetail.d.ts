import { DigitalPayGiftingProduct, GiftingProductDesign } from "./DigitalPayGiftingProduct";
/**
 * Gift card product detailed data
 *
 * @category Model
 */
export interface DigitalPayGiftingProductDetail extends DigitalPayGiftingProduct {
	/** Display instruction on where and how to redeem the product */
	redemptionInstructions?: string;

	/** The enabled redemption channels */
	redemptionType: "INSTORE" | "ONLINE" | "BOTH";

	/** Terms and conditions text for the gift card product */
	termsAndConditions?: string;

	/** Minimum AUD value gift card able to be purchased for this product */
	minValue: number;

	/** Maximum AUD value gift card able to be purchased for this product */
	maxValue: number;

	/** Expiry period for the gift card product once purchased */
	expiryPeriodInDays?: number;

	/** Display text for the expiry period */
	expiryPeriodText?: string;

	/** Returns true if the gift card product is active, else false. Only active programs are orderable */
	isActive: boolean;

	/** The stores in which the gift card product is able to be redeemed */
	redemptionStores?: string[];

	/** Digital or phyiscal availability of the gift card */
	availability: "DIGITAL" | "PHYSICAL" | "BOTH";

	/** Array of all alternative designs for the gift card product */
	designs: GiftingProductDesign[];
}
