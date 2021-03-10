import { DigitalPayPaymentRequest, DigitalPayPaymentResponse } from "../../model";
import { DigitalPayCompletionRequest } from "../../model/DigiPayModel/DigitalPayCompletionRequest";
import { DigitalPayCompletionResponse } from "../../model/DigiPayModel/DigitalPayCompletionResponse";
import { DigitalPayRefundRequest } from "../../model/DigiPayModel/DigitalPayRefundRequest";
import { DigitalPayRefundResponse } from "../../model/DigiPayModel/DigitalPayRefundResponse";
import { DigitalPayVoidRequest } from "../../model/DigiPayModel/DigitalPayVoidRequest";
import { DigitalPayVoidResponse } from "../../model/DigiPayModel/DigitalPayVoidResponse";

/**
 * @category API
 */
export interface PaymentApi {
	/**
	 * Make payments to a merchant using payment intruments.
	 *
	 * @param paymentRequest detail of payment to be made
	 */
	pay(paymentRequest: DigitalPayPaymentRequest): Promise<DigitalPayPaymentResponse>;

	/**
	 * Make guest payments to a merchant using guest payment intruments.
	 *
	 * @param paymentRequest detail of payment to be made
	 */
	guestPayment(paymentRequest: DigitalPayPaymentRequest): Promise<DigitalPayPaymentResponse>;

	/**
	 * Complete pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 *  @param completionRequest detail of payment to be completed
	 */
	complete(
		completionRequest: DigitalPayCompletionRequest
	): Promise<DigitalPayCompletionResponse>;

	/**
	 * Void (cancel) pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param voidRequest detail of payment to be voided
	 */
	voidPayment(voidRequest: DigitalPayVoidRequest): Promise<DigitalPayVoidResponse>;

	/**
	 * Make payments to a merchant using Openpay payment tokens.
	 *
	 * @param refundRequest detail of payment to be refunded
	 */
	refund(refundRequest: DigitalPayRefundRequest): Promise<DigitalPayRefundResponse>;
}
