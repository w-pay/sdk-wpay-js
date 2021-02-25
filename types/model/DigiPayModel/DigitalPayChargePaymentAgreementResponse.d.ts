"ChargePaymentAgreementRequest"
import { DigitalPayFraudPayload } from "./DigitalPayFraudPayload"
import { DigitalPayTransactionType } from "./DigitalPayTransactionType"

/**
 * The JSON request structure of the Charge Payment Agreement endpoint.
 * 
 * @category Model
 */
export interface DigitalPayChargePaymentAgreementRequest {
        /** Transaction type containers to use for all instruments. */
        transactionType: DigitalPayTransactionType;

        /** 
         * A merchant application specific reference number. 
         * 
         * This number should uniquely identify the transaction in the merchant’s system. 
         */
        clientReference: string;

        /** 
         * A merchant application specific reference number. 
         * 
         * This number should uniquely identify the customer in the merchant’s system. 
         */
        customerRef?: string;

        /** The merchant order number of the transaction. */
        orderNumber: string;

        /** 
         * The payment token of the payment agreement. 
         * 
         * The payment token is a unique identifier for the payment agreement.
         */
        paymentToken: string;

        /** The amount that will be charged against the payment instrument linked to the payment agreement. */
        amount: number;

        /** Digital Pay fraud payload */
        fraudPayload?: DigitalPayFraudPayload
}