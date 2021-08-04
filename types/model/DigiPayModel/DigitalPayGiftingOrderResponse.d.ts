/**
 * Results of the gifting order
 *
 * @category Model
 */
export interface DigitalPayGiftingOrderResponse {
	/** Current order status */
	status: string;

	/** Order reference */
	orderId: string;

	/** Quote reference */
	quoteNo: string;
}
