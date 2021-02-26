import { OpenPayCompletionRequest } from "../../model/DigiPayModel/OpenPayCompletionRequest";
import { OpenPayCompletionResponse } from "../../model/DigiPayModel/OpenPayCompletionResponse";
import { OpenPayPaymentRequest } from "../../model/DigiPayModel/OpenPayPaymentRequest";
import { OpenPayPaymentResponse } from "../../model/DigiPayModel/OpenPayPaymentResponse";
import { OpenPayVoidRequest } from "../../model/DigiPayModel/OpenPayVoidRequest";
import { OpenPayVoidResponse } from "../../model/DigiPayModel/OpenPayVoidResponse";
import { OpenPayRefundRequest } from "../../model/DigiPayModel/OpenPayRefundRequest";
import { OpenPayRefundResponse } from "../../model/DigiPayModel/OpenPayRefundResponse";

/**
 * @category API
 */
export interface OpenPayApi {
	/**
	 * Make payments to a merchant using Openpay payment tokens.
	 *
	 * @param paymentRequest detail of payment to be made
	 */
	pay(paymentRequest: OpenPayPaymentRequest): Promise<OpenPayPaymentResponse>;

	/**
	 * Complete pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param completionRequest detail of payment to be completed
	 */
	complete(completionRequest: OpenPayCompletionRequest): Promise<OpenPayCompletionResponse>;

	/**
	 * Void (cancel) pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param voidRequest detail of payment to be voided
	 */
	voidPayment(voidRequest: OpenPayVoidRequest): Promise<OpenPayVoidResponse>;

	/**
	 * Make payments to a merchant using Openpay payment tokens.
	 *
	 * @param refundRequest detail of payment to be refunded
	 */
	refund(refundRequest: OpenPayRefundRequest): Promise<OpenPayRefundResponse>;
}
