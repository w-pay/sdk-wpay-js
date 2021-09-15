import { GiftingProductOrderItem } from "./GiftingProductOrderItem";

/**
 * Request payload containing details of the order to quote on
 *
 * @category Model
 */
export interface DigitalPayGiftingQuoteRequest {
	/** Gift cards to be included in the order. */
	orderItems: GiftingProductOrderItem[];
}
