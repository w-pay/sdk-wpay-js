/**
 * Basket of items associated with a payment request.
 *
 * @category Model
 */
export interface Basket {
	/** Items in the basket */
	items: BasketItem[];
}

/**
 * An item in a {@link Basket}
 *
 * @category Model
 */
export interface BasketItem {
	/** Short label for the basket item. */
	label: string;

	/** Longer description of the basket item. */
	description?: string;

	/** The number of units of the item in the basket if multiple is possible. */
	quantity?: number;

	/** The unit price of the item. May be positive or negative. */
	unitPrice?: number;

	/** Optional display string for the measure of the unit. */
	unitMeasure?: string;

	/** The total price of the item. May be positive or negative. */
	totalPrice?: number;

	/** Additional key/value pairs for the item defined by the merchant. */
	tags?: Map<string, string>;
}
