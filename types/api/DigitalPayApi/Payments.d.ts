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
	 */
	pay(paymentRequest: DigitalPayPaymentRequest): Promise<DigitalPayPaymentResponse>;

    /**
	 * Complete pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 */
	complete(completeRequest: DigitalPayCompletionRequest): Promise<DigitalPayCompletionResponse>

    /**
	 * Void (cancel) pre-authed Openpay payments. This API is IP restricted to allow unauthenticated server side calls.
	 */
	void(voidRequest: DigitalPayVoidRequest): Promise<DigitalPayVoidResponse>;

    /**
	 * Make payments to a merchant using Openpay payment tokens.
	 */
	refund(refundRequest: DigitalPayRefundRequest ): Promise<DigitalPayRefundResponse>;
}
