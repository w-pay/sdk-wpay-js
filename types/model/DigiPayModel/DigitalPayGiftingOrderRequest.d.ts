import { GiftingProductOrderItem } from "./GiftingProductOrderItem";

/**
 * Request payload containing details of the order
 *
 * @category Model
 */
export interface DigitalPayGiftingOrderRequest {
	/** The instrumentId to be used for the order. Must not be a stored gift card */
	instrumentId: string;

	/** Email of the ordering customer */
	deliveryEmail: string;

	/** Unique reference for the order supplied by the client */
	referenceId: string;

	/** Face value of the gift card */
	subTotalAmount: number;

	/** Eligible discount amount. In case of no discounts, value will be 0 */
	discountAmount: number;

	/** Net amount payable */
	totalOrderAmount: number;

	/** Billing address for the order */
	billingContact: GiftingBillingContact;

	/** Gift cards to be included in the order.  Currently only supports a single entry.  Array is for future roadmap */
	orderItems: GiftingProductOrderItem[];
}

interface GiftingBillingContact {
	/** The customer's first name. */
	firstName: string;

	/** The customer's last name. */
	lastName: string;

	/** The email of the ordering customer. */
	email: string;

	/** The mobile number of the ordering customer */
	mobileNumber: string;

	/** The customer's street address line. */
	streetAddress: string;

	/** The customer's extended address line. */
	extendedAddress?: string;

	/** The customer's suburb. */
	suburb: string;

	/** The customer's abbreviated state or territory. */
	stateOrTerritory: string;

	/** The customer's postal code. */
	postalCode: string;

	/** The customer's Alpha-2 (2-character) ISO-3166-1 country code. */
	countryCode: string;
}
