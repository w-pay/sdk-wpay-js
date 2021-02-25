/**
 * The JSON request structure of the Import Payment Instruments endpoint.
 *
 * @category Model
 */
export interface ImportPaymentInstrumentsRequest{ 
    
    /* The IDM (Gigya) UID or merchant shopper id of the user. Do NOT use an email address! */
    uid: string;
    
    /* The merchant shopper id of the user. */
    shopperId: string;
    
    creditCards?: CreditCard[];
    payPal?: {
            /* The Paypal customer id. */
            customerId:	string;
            
            /* The Paypal email id. */
            payPalId: string;
            
            /* The Paypal payment method token. */
            paymentMethodToken:	string;
        }
}

interface CreditCard{
    /* WebPay reference in the transaction logs. This number uniquely identifies the transaction in WebPay. */
    transactionRef: string;
    
    /* The WebPay transaction timestamp. The timestamp format is ISO8601. */
    transactionTimestamp: string;

    /* The merchant order number used in the WebPay transaction. */
    orderNumber: string;

    /* The bin (first 6 digits) of the credit card number used in the WebPay transaction. */
    bin: string;
    
    /* The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
    cardSuffix:	string;
    
    /* The amount of the WebPay transaction. */
    amount:	number;
}