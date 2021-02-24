
import { 
    PaymentAgreement, 
    CreatePaymentAgreementRequest, 
    UpdatePaymentAgreementRequest 
} from "../model";

/**
 * @category API
 */
export interface CustomerPaymentAgreementsApi {
    /**
	 * Retrieve a list of customer's {@link PaymentAgreement}s
     * 
     * @param type The type of Ts and Cs that the shopper/customer has agreed to. Defaults to all if absent
	 */
	get(type?: string): Promise<PaymentAgreement[]>;

	/**
	 * Retrieve a {@link PaymentAgreement} by its associated payment token
	 *
	 * @param paymentToken The ID.
	 */
	getById(paymentToken: string): Promise<PaymentAgreement>;

    /**
	 * Create a {@link PaymentAgreement}
	 *
	 * @param paymentAgreement The details for the new payment agreement
	 */
	create(paymentAgreement: CreatePaymentAgreementRequest): Promise<PaymentAgreement>;

    /**
	 * Update a {@link PaymentAgreement}
	 *
	 * @param paymentToken The payment token to update
	 * @param paymentAgreement The updates to apply to the payment agreement
	 */
	update(paymentToken: string, paymentAgreement: UpdatePaymentAgreementRequest): Promise<PaymentAgreement>;
	
}
