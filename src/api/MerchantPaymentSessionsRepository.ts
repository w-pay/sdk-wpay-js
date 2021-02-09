import { CreatePaymentSessionRequest } from "../model";
import { CreatePaymentSessionResult } from "../model";
import { MerchantUpdatePaymentSessionRequest } from "../model";
import { PaymentSession } from "../model";

export interface MerchantPaymentSessionsRepository {
	/**
	 * Create a new {@link PaymentSession}
	 *
	 * @param request The details for the new session.
	 */
	create(request: CreatePaymentSessionRequest): Promise<CreatePaymentSessionResult>;

	/**
	 * Retrieve a {@link PaymentSession}
	 *
	 * @param paymentSessionId The ID of the payment session to retrieve.
	 */
	getById(paymentSessionId: string): Promise<PaymentSession>;

	/**
	 * Update a {@link PaymentSession}
	 *
	 * @param paymentSessionId The payment session to update
	 * @param session The details to update the session with
	 */
	update(paymentSessionId: string, session: MerchantUpdatePaymentSessionRequest): Promise<void>;

	/**
	 * Delete a {@link PaymentSession}
	 *
	 * @param paymentSessionId The payment session to delete.
	 */
	delete(paymentSessionId: string): Promise<void>;
}
