
/* The JSON success response structure of the Verify Payment Instruments endpoint. */
export interface VerifyPaymentInstrumentsSuccessResponse {

    /* Container reference in the transaction logs. This number uniquely identifies the whole/grouped transaction in the container. */
    transactionReceipt: string;
    
    /* Not in use. A property that will be used in future for multi-instrument verification.*/
    partialSuccess: boolean;
    example: false
    
    
    fraudResponse: {
        /* The fraud check client id. Will be null if the fraud check was skipped. */
        clientId: string;
    
        /* The fraud check reason code. Will be null if the fraud check was skipped. */
        reasonCode: string;
    
        /* The fraud check decision. Will be null if the fraud check was skipped. */
        decision: string
    }
    verifyResponses: VerifyResponse[]
}

interface VerifyResponse {
    /* The payment token. */
    paymentToken: string;
    
    /* Container reference in the transaction logs. This number uniquely identifies the transaction in the container. */
    verifyTransactionRef: string
    
    /* The external service code (from eg. Webpay). This property is only included in the response if it is enabled in the consumers API configuration. */
    externalServiceCode: string
    
    /* The external service message (from eg. Webpay). This property is only included in the response if it is enabled in the consumers API configuration. */
    externalServiceMessage: string
}
