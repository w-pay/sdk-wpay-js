import { DigitalPayGiftingProduct } from "../../model/DigiPayModel/DigitalPayGiftingProduct";
import { DigitalPayGiftingProductDetail } from "../../model/DigiPayModel/DigitalPayGiftingProductDetail";
import { DigitalPayGiftingQuoteRequest } from "../../model/DigiPayModel/DigitalPayGiftingQuoteRequest";
import { DigitalPayGiftingQuoteResponse } from "../../model/DigiPayModel/DigitalPayGiftingQuoteResponse";
import { DigitalPayGiftingOrderRequest } from "../../model/DigiPayModel/DigitalPayGiftingOrderRequest";
import { DigitalPayGiftingOrderResponse } from "../../model/DigiPayModel/DigitalPayGiftingOrderResponse";
import { ChallengeResponse, FraudPayload } from "../..";

/**
 * @category API
 */
export interface GiftingApi {
	/**
	 * Obtains a detail of an available gift card product that can be purchased
	 *
	 * @param productId detail of payment to be made
	 */
	getProductById(productId: string): Promise<DigitalPayGiftingProductDetail>;

	/**
	 * Obtains a list of available gift card products that can be purchased.
	 *
	 * @param page The page of results to return with 1 indicating the first page
	 * @param pageSize The number of records to return for this page
	 * @param lastUpdateDateTime If present, only products changed since this time will be returned
	 */
	listProducts(
		page?: number,
		pageSize?: number,
		lastUpdateDateTime?: Date
	): Promise<DigitalPayGiftingProduct[]>;

	/**
	 * Validates a gift card order and verifies discount prior to an order being placed.
	 *
	 * @param quoteRequest detail of gift card quote being obtained
	 */
	getQuote(
		quoteRequest: DigitalPayGiftingQuoteRequest
	): Promise<DigitalPayGiftingQuoteResponse>;

	/**
	 * Order a gift card product.
	 *
	 * @param orderRequest detail of gift card order being made
	 * @param challengeResponses Used when needing to complete challenge(s) to complete payment.
	 * @param fraudPayload Used to complete the fraud check.
	 */
	order(
		orderRequest: DigitalPayGiftingOrderRequest,
		challengeResponses?: ChallengeResponse[],
		fraudPayload?: FraudPayload
	): Promise<DigitalPayGiftingOrderResponse>;
}
