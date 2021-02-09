import { Basket } from "./Basket";
import { Payment } from "./Payment";

/**
 * Detailed information for a single Payment Request
 */
export interface CustomerPaymentRequest extends Payment {
	/** The ID of the merchant associated with this transaction */
	merchantId: string;

	/** The {@link Basket} associated to this Payment Request` */
	basket?: Basket;
}
