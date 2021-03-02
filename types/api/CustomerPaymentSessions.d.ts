import { ChallengeResponse } from "../model";
import { CustomerUpdatePaymentSessionRequest } from "../model";
import { PaymentInstrumentIdentifier, SecondaryPaymentInstrument } from "../model";
import { PaymentSession } from "../model";

/**
 * @category API
 */
export interface CustomerPaymentSessionsApi {
	/**
	 * Retrieve a {@link PaymentSession} by it's ID
	 *
	 * @param paymentSessionId The payment session ID.
	 */
	getById(paymentSessionId: string): Promise<PaymentSession>;

	/**
	 * Retrieve a {@link PaymentSession} by a QR code ID associated to the session.
	 *
	 * @param qrCodeId The QR code ID.
	 */
	getByQRCodeId(qrCodeId: string): Promise<PaymentSession>;

	/**
	 * Update a {@link PaymentSession}
	 *
	 * @param paymentSessionId The payment session to update
	 * @param session The updates to apply to the session
	 */
	update(paymentSessionId: string, session: CustomerUpdatePaymentSessionRequest): Promise<void>;

	/**
	 * Delete a {@link PaymentSession}
	 *
	 * @param paymentSessionId The payment session to delete
	 */
	delete(paymentSessionId: string): Promise<void>;

	/**
	 * Pre-approve payment for a {@link PaymentSession}
	 *
	 * @param paymentSessionId The {@link PaymentSession} to pre-approve payment for.
	 * @param primaryInstrument The primary (or only) instrument to use to make the payment.
	 * @param secondaryInstruments Other payment instruments to use to split payment.
	 * @param skipRollback An optional flag to indicate that the automatic rollback step should be skipped in the case of failure
	 * @param clientReference An optional client reference to be associated with the transaction.
	 * @param challengeResponses Used when needing to complete challenge(s) to complete payment.
	 */
	preApprove(
		paymentSessionId: string,
		primaryInstrument: PaymentInstrumentIdentifier,
		secondaryInstruments?: SecondaryPaymentInstrument[],
		skipRollback?: boolean,
		clientReference?: string,
		challengeResponses?: ChallengeResponse[]
	): Promise<void>;
}
