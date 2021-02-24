import { CreditCardStepUp } from "../PaymentInstruments";

/**
 * The JSON success response structure of the Payments endpoint.
 *
 * @category Model
 */
export interface OpenPayPaymentResponse {
	/**
     *  Container reference in the transaction logs. 
     * 
     * This number uniquely identifies the whole/grouped transaction in the container. 
     */
    transactionReceipt: string;
    
    /** 
     * A flag to indicate if a split payment was only partially successful, 
     * 
     * ie. at least 1 of the payment instruments had a successful payment result. 
     */
    partialSuccess: boolean;

    /** OpenPay fraud response */
    fraudResponse: OpenPayFraudResponse;
    
    /** OpenPay payment credit card payments */
    creditCards: OpenPayCreditCard[];
    
    /** OpenPay payment gift card payments */
    giftCards: OpenPayGiftCard[];

    /** OpenPay PayPal card payments */
    payPal: OpenPayPayPal[];

    /** 
     * Android Pay has been replaced by Google Pay. 
     * 
     * This property has been retained for backward compatibility and will always be an empty array. 
     */
    androidPay: unknown[];

    /** OpenPay payment Google Pay payments */
    googlePay: OpenPayGooglePay[];
    
    /** OpenPay payment Apple Pay payments */
    applePay: OpenPayApplePay[];
    
    /** OpenPay payment unknown payments */
    unknown: OpenPayPaymentInstrument[];
}

export interface OpenPayStoreData {
    /** The payment transaction store id. */
    storeId: string; 

    /** A pin for the payment method id. */
    pin: string;
}

export interface OpenPayPayments {
    /** The payment token. */
    paymentToken: string;

    /** The amount you want to pay with the payment instrument. */
    amount: number;

    /** The GST amount of the full amount you want to pay with the payment instrument. */
    gstAmount?: number;
}

export interface OpenPayFraudResponse {
    /** The fraud check client id. Will be null if the fraud check was skipped. */
    clientId: string;
    
    /** The fraud check reason code. Will be null if the fraud check was skipped. */
    reasonCode: string;

    /** The fraud check decision. Will be null if the fraud check was skipped. */
    decision: string;
}

export interface OpenPayPaymentInstrument {
    /** The credit card payment instrument id. */
    paymentInstrumentId: string;

    /** The credit card payment token. The payment token is a unique identifier for the payment instrument. */
    paymentToken: string;
        
    /** Container reference in the transaction logs. This number uniquely identifies the credit card transaction in the container. */
    paymentTransactionRef: string;
    
    /** The error code. Only present if an error occurred during payment. */
    errorCode: string;

    /** The error message. Only present if an error occurred during payment. */
    errorMessage: string;

    /** The error detail. Only present if an error occurred during payment. */
    errorDetail: string;
}

export interface OpenPayCreditCard {
    /** Only present if an error occurred during payment. */
    stepUp?: CreditCardStepUp;

    /** This object is only included in the response if it is enabled in the consumers API configuration. */
    receiptData?: OpenPayRecieptData;
                
    /** This array is only included in the response if it is enabled in the consumers API configuration. */
    extendedTransactionData?: OpenPayExtendedTransactionData[];

    /** 
     * The external service code (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceCode?: string;
    
    /** 
     * The external service message (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceMessage?: string;
    
    /** 
     * Special handling instructions that have to be executed after a payment. 
     * 
     * Only present if no error occurred during payment. 
     */
    handlingInstructions?: OpenPayHandlingInstructions;
}

export interface OpenPayGiftCard {
    /** Only present if an error occurred during payment. */
    stepUp?: CreditCardStepUp;

    /** This object is only included in the response if it is enabled in the consumers API configuration. */
    receiptData?: OpenPayRecieptData;
                
    /** 
     * The external service code (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceCode?: string;
    
    /** 
     * The external service message (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceMessage?: string;
}

export interface OpenPayPayPal {
    /** This object is only included in the response if it is enabled in the consumers API configuration. */
    receiptData?: OpenPayRecieptData;
                
    /** 
     * The external service code (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceCode?: string;
    
    /** 
     * The external service message (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceMessage?: string;
}

export interface OpenPayGooglePay {
    /** Only present if an error occurred during payment. */
    stepUp?: CreditCardStepUp;
                
    /** This array is only included in the response if it is enabled in the consumers API configuration. */
    extendedTransactionData?: OpenPayExtendedTransactionData[];

    /** 
     * The external service code (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceCode?: string;
    
    /** 
     * The external service message (from eg. Webpay). 
     * 
     * This property is only included in the response if it is enabled in the consumers API configuration. 
     */
    externalServiceMessage?: string;
}

export interface OpenPayApplePay {
    /** Only present if an error occurred during payment. */
    stepUp?: CreditCardStepUp;
}

export interface OpenPayHandlingInstructions {
    /** The handling instruction message. */
    instructionMessage: string;

    /** The handling instruction code. */
    instructionCode: OpenPayInstructionCode;
}

export interface OpenPayRecieptData {
    /** The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
    cardSuffix: string;
    
    /** The credit card scheme. */
    scheme: string;

    /** The month of the expiry date of the credit card. */
    expiryMonth: string;

    /** The year of the expiry date of the credit card. */
    expiryYear: string;
}

export interface OpenPayExtendedTransactionData {
    /** 
     * The name of the extended transaction data field. 
     * 
     * The 'token' field is only included in the response if it is enabled in the consumers API configuration. 
     */
    field: OpenPayExtendedTransactionDataFieldName;

    /** The value of the extended transaction data field. */
    value: string;
}

export enum OpenPayInstructionCode {
    100 = "100",
	110 = "110",
	120 = "120"
}

export enum OpenPayExtendedTransactionDataFieldName {
    OPEN_PAY_TRANSACTION_ID = "openPayTransactionId",
    OPEN_PAY_ORDER_ID = "openPayOrderId",
    OPEN_PAY_PAYMENT_METHOD = "openPayPaymentMethod",
    OPEN_PAY_CREATED_AT = "openPayCreatedAt",
    OPEN_PAY_BILLING_ACCOUNT_ID = "openPayBillingAccountId",
    OPEN_PAY_BILLING_ACCOUNT_NAME = "openPayBillingAccountName",
    OPEN_PAY_BILLING_ACCOUNT_ABN = "openPayBillingAccountABN"
}