import { OpenPayExtendedTransactionData } from "./OpenPayPaymentResponse";

/**
 * The JSON success response structure of the Openpay Refunds endpoint.
 * 
 * @category Model
 */
export interface OpenPayRefundResponse {
    /**
     * Container reference in the transaction logs. 
     * 
     * This number uniquely identifies the whole/grouped transaction in the container. 
     */
    transactionReceipt: string;

    /** List of refund response */
    refundResponses: OpenPayRefundTransactionResponse;
}

export interface OpenPayRefundTransactionResponse {
    /** 
     * Container reference in the transaction logs. 
     * 
     * This number uniquely identifies the openpay transaction in the container.
     */
    paymentTransactionRef: string;
    
    /** Container reference in the transaction logs. This number uniquely identifies the refund transaction in the container. */
    refundTransactionRef: string;
           
    /** The amount processed in the refund. */
    amount: number;

    /** This array is only included in the response if it is enabled in the consumers API configuration. */
    extendedTransactionData?: OpenPayExtendedTransactionData;
        
    /** 
     * The external service code (from eg. Openpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceCode?: string;

    /** 
     * The external service message (from eg. Openpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceMessage?: string;
}