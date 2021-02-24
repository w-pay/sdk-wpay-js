import { OpenPayCompleteRequest } from "../../model/DigiPayModel/OpenPayCompletionRequest";
import { OpenPayCompleteResponse } from "../../model/DigiPayModel/OpenPayCompletionResponse";
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
	 */
	pay(paymentRequest: OpenPayPaymentRequest): Promise<OpenPayPaymentResponse>;

    /**
	 * Complete pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 */
	complete(completeRequest: OpenPayCompleteRequest): Promise<OpenPayCompleteResponse>

    /**
	 * Void (cancel) pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 */
	void(voidRequest: OpenPayVoidRequest): Promise<OpenPayVoidResponse>;

    /**
	 * Make payments to a merchant using Openpay payment tokens.
	 */
	refund(refundRequest: OpenPayRefundRequest): Promise<OpenPayRefundResponse>;
}
