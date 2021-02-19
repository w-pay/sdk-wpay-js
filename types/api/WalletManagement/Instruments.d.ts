/**
 * @category API
 */
export interface Instruments {
	/**
	 * Import a consumers credit cards (from WebPay) and paypal accounts to a new wallet. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param 
	 */
    import(importPaymentInstrumentsRequest: ImportPaymentInstrumentsRequest): Promise<ImportPaymentInstrumentsResponse>;
    
    /**
	 * Verify if a provided payment instrument is valid and optionally perform a fraud check on the instrument.
	 *
	 * @param 
	 */
    verify(verifyPaymentInstrumentsRequest: VerifyPaymentInstrumentsRequest): Promise<VerifyPaymentInstrumentsSuccessResponse>;
    
    /**
	 * Get the stored payment intruments of a consumer.
	 *
	 * @param 
	 */
    getList(): Promise<ListPaymentInstrumentsResponse>;
    
    /**
	 * Get the stored payment intruments of a consumer. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 */
    postList(): Promise<ListPaymentInstrumentsResponse>;

    /**
	 * Get the stored payment intruments of a consumer. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param 
	 */
    delete(paymentInstrumentId: string): Promise<{}>;
}

interface CreditCardDetails{
    /* The credit card payment instrument id. */
    paymentInstrumentId: string;
    
    /* The credit card payment token. The payment token is a unique identifier for the payment instrument. */
    paymentToken: string;
    
    /* The status of the payment instrument in the container. */
    status: "UNVERIFIED_PERSISTENT" | "VERIFIED" ;
    
    /* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
    lastUpdated: string;
    
    
    /* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
    lastUsed: string;
    
    /* A flag to indicate if this payment instrument is the primary instrument in the container. */
    primary: boolean;
    
    /* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
    allowed: boolean;
    
    /* The year of the expiry date of the credit card. */
    expiryYear: string;
    
    /* The month of the expiry date of the credit card. */
    expiryMonth: string;
    
    /* The credit card scheme. */
    scheme: string;
    
    /* The suffix (last 4 digits) of the credit card number. */
    cardSuffix: string;
    
    /* A flag to indicate if the CVV of the credit card has been validated. */
    cvvValidated: boolean;
    
    /* The nickname of the credit card instrument in the container. */
    cardName: string;
    
    /* A flag to indicate if the credit card is expired. */
    expired: boolean;
    
    /* A flag to indicate if payments with this credit card requires a CVV check. */
    requiresCVV: boolean;
    
    /* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV. */
    updateURL: string
    
    stepUp: {
        /* The type of the step up action. For credit cards this will be CAPTURE_CVV which identifies that the consumer must capture the CVV prior to payment. */
        type: string;
        
        /* A flag to indicate if this step up (action) is mandatory. */
        mandatory: boolean
        
        /* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV or CVV only. The URL will automatically switch between expiry and CVV or CVV only endpoints based on the container requirement. */
        url: string;
        }
    }

interface GiftCardDetails {
    /* The gift card payment instrument id. */
    paymentInstrumentId: string;

    /* The gift card payment token. The payment token is a unique identifier for the payment instrument. */
    paymentToken: string;

    /* The status of the payment instrument in the container. */
    status: 'UNVERIFIED_PERSISTENT' | 'VERIFIED';

    /* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
    lastUpdated: string;
    
    /* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
    lastUsed: string;
    
    /* A flag to indicate if this payment instrument is the primary instrument in the container. */
    primary: boolean;

    /* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
    allowed: boolean;
    
    /* The gift card program name. */
    programName: string;
    
    /* The suffix (last 4 digits) of the gift card number. */
    cardSuffix: string;
}

interface PayPalDetails {
    /* The paypal payment instrument id. */
    paymentInstrumentId: string;

    /* The paypal payment token. The payment token is a unique identifier for the payment instrument. */
    paymentToken: string;
    
    /* The status of the payment instrument in the container. */
    status: 'UNVERIFIED_PERSISTENT' | 'VERIFIED';

    /* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
    lastUpdated: string;

    /* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
    lastUsed: string;
    
    /* A flag to indicate if this payment instrument is the primary instrument in the container. */
    primary: boolean;
    
    /* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
    allowed: boolean;
    
    /* The Paypal email id. */
    payPalId: string;

    /* The Paypal customer id. */
    customerId: string;
}

interface PaymentAgreementDetails {
    /* The payment token of the payment agreement. The payment token is a unique identifier for the payment agreement. */
    paymentToken: string;
    
    /* The status of the payment agreement in the container. */
    status:  'UNVERIFIED_PERSISTENT', 'VERIFIED'
    
    /* The timestamp the payment agreement was last updated in the container. The timestamp format is ISO8601. */
    lastUpdated: string;
    
    /* The timestamp the payment agreement was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
    lastUsed: string;
    
    /* A flag to indicate if this payment instrument is the primary instrument in the container. Not used for payment agreements. */
    primary: boolean;
    
    /* A flag to indicate if the merchant profile in the container allows the use of this payment agreement. */
    allowed: boolean;
    
    /* The payment agreement type. */
    type: 'RECURRING', 'ADHOC', 'INSTALLMENT'; 
    
    
    /* The payment agreement payment instrument id that will be used for the charges. */
    paymentInstrumentId: string;
    
    /* The credit card scheme. */
    scheme?: string;
    
    /* The suffix (last 4 digits) of the credit card number. */
    cardSuffix?: string;
    
    /* The month of the expiry date of the credit card. */
    expiryMonth?: string;
    
    /* The year of the expiry date of the credit card. */
    expiryYear?: string;

    /* The payment agreement start date and time. The timestamp format is ISO8601. */
    startDate: string;
    
    /* The payment agreement end date and time. The timestamp format is ISO8601. */
    endDate: string;
    
    /* The payment agreement charge frequency. */
    chargeFrequency: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY';
    
    /* The amount that will be charged at the frequency specified in the payment agreement. */
    chargeAmount: number;
    
    /* The current charge cycle number. */
    chargeCycle: number;
    
    /* A flag to indicate if the payment agreement is expired. */
    expired: string
    
    /* The URL of the endpoint to use to update the payment agreement. */
    updateURL: string
    
    stepUp?:	{
            /* The type of the step up action. For payment agreements this will be CAPTURE_CVV which identifies that the consumer must capture the CVV prior to payment.*/
            type: string;
            
            /* A flag to indicate if this step up (action) is mandatory. */
            mandatory: boolean;
            
            /* The URL of an iframe. This iframe is used to capture a credit card expiry and CVV or CVV only. The URL will automatically switch between expiry and CVV or CVV only endpoints based on the container requirement. */
            url: string
        }
    }

interface GooglePayDetails {
    /* The google pay payment instrument id. */
    paymentInstrumentId: string;
    
    /* The google pay payment token. The payment token is a unique identifier for the payment instrument. */
    paymentToken: string;
    
    /* The status of the payment instrument in the container. */
    status: 'UNVERIFIED_PERSISTENT'|  'VERIFIED';
    
    /* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
    lastUpdated: string;
    
    /* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
    lastUsed: string;
    
    /* A flag to indicate if this payment instrument is the primary instrument in the container. */
    primary: boolean;
    
    /* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
    allowed: boolean;
    
    /* A flag to indicate if the Google Pay token is expired. */
    expired: boolean;
    
    /* This object will only be present if the Google Pay token is expired. Check the 'expired' flag for this status. */
    stepUp?: {
    
            /* The type of the step up action. For google pay this will be REFRESH_TOKEN. */
            type: 'REFRESH_TOKEN'
            
            /* A flag to indicate if this step up (action) is mandatory. */
            mandatory: boolean;
            
            /* The URL of the endpoint to use to update the google pay token. */
            url: string;
        }
    }

    interface ApplePayDetails{
        /* The apple pay payment instrument id. */
        paymentInstrumentId: string;
        
        /* The apple pay payment token. The payment token is a unique identifier for the payment instrument. */
        paymentToken: string;
        
        /* The status of the payment instrument in the container. */
        status: 'UNVERIFIED_PERSISTENT' | 'VERIFIED';
        
        /* The timestamp the payment instrument was last updated in the container. The timestamp format is ISO8601. */
        lastUpdated: string;
        
        /* The timestamp the payment instrument was last used in the container. The timestamp format is ISO8601. Will be null if never used. */
        lastUsed: string;
        
        /* A flag to indicate if this payment instrument is the primary instrument in the container. */
        primary: boolean;
        
        /* A flag to indicate if the merchant profile in the container allows the use of this payment instrument. */
        allowed: boolean;
        stepUp:	{
            /* The type of the step up action. For apple pay this will be REFRESH_TOKEN. */
            type: string;
            
            /* A flag to indicate if this step up (action) is mandatory. */
            mandatory: boolean
            
            /* The URL of the endpoint to use to update the apple pay token. */
            url: string
        }
         
    }

/* The JSON response structure of the List Payment Instruments endpoint. */
interface ListPaymentInstrumentsResponse{
    creditCards: CreditCardDetails[]
    giftCards: GiftCardDetails[]
    payPal: PayPalDetails[]
    paymentAgreements: PaymentAgreementDetails[]
    /* Android Pay has been replaced by Google Pay. This property has been retained for backward compatibility and will always be null. */
    androidPay: null;
    googlePay: GooglePayDetails
    applePay: ApplePayDetails
}
    


interface PaymentInstrument{
    /* The payment token. */
    paymentToken: string;

    /** 
     * The step-up token is used to track additional credit card information (eg. CVV and expiry) attached to the payment instrument. 
     * It's only valid for a predefined time and if an expired step-up token is used during payment, 
     * the payment for that instrument will fail and the user will have to get a new step-up token before retrying the payment. 
     * A step-up token is returned in the response of a credit card iframe. 
     * This property is currently only required for credit card instruments and only if specific credit card information (eg. CVV and expiry) is required during payment.
    */
    stepUpToken: string;
}

/* The JSON request structure of the Verify Payment Instruments endpoint. */
interface VerifyPaymentInstrumentsRequest{
    
    /* A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system.*/
    clientReference: string;
    
    /* The step-up token is used to track additional credit card information (eg. CVV and expiry) attached to the payment instrument. It's only valid for a predefined time and if an expired step-up token is used during payment, the payment for that instrument will fail and the user will have to get a new step-up token before retrying the payment. A step-up token is returned in the response of a credit card iframe. This property is currently only required for credit card instruments and only if specific credit card information (eg. CVV and expiry) is required during payment. */
    paymentInstruments:	PaymentInstrument[]

    /* Set to null to skip the fraud check. */
    fraudPayload?:{
        /* The fraud check provider. */
        provider: string;
        
        /* The fraud check version. */
        version: string;

        /* The fraud check message format. */
        format: 'ZIP_BASE_64_ENCODED' | 'XML';
        
        /* The fraud check message format. */
        responseFormat:	'ZIP_BASE_64_ENCODED' | 'XML';
        
        /* The fraud check message. */
        message: string;
    }
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

/* The JSON success response structure of the Verify Payment Instruments endpoint. */
interface VerifyPaymentInstrumentsSuccessResponse {

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

/**
 * The JSON request structure of the Import Payment Instruments endpoint.
 *
 * @category Model
 */
interface ImportPaymentInstrumentsRequest{ 
    
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

interface CreditCardResult {
    /* WebPay reference in the transaction logs. This number uniquely identifies the transaction in WebPay. */
    transactionRef:	string;
    
    /* The WebPay transaction timestamp. The timestamp format is ISO8601. */
    transactionTimestamp: string;
    
    /* The WebPay transaction type. */
    transactionType: string;

    /* The WebPay transaction response code. */
    transactionResponseCode: string;
    
    /* The WebPay transaction response text. */
    transactionResponseText: string;
    
    /* The merchant order number used in the WebPay transaction. */
    orderNumber: string;

    /* The bin (first 6 digits) of the credit card number used in the WebPay transaction. */
    bin: string;
    
    /* The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
    cardSuffix: string;

    /* The month of the expiry date of the credit card. */
    expiryMonth: string;

    /* The year of the expiry date of the credit card. */
    expiryYear:	string;
    
    /* The amount of the WebPay transaction. */
    amount: number;
    
    /* The import process result for the credit card instrument. */
    result: "OK" | "DUP" |  "EXP" | "ERROR" ;

    errorMessage: {
        description?: string;
    }
}

interface PaypalResult {
    /* WebPay reference in the transaction logs. This number uniquely identifies the transaction in WebPay. */
    transactionRef:	string;
    
    /* The WebPay transaction timestamp. The timestamp format is ISO8601. */
    transactionTimestamp: string;
    
    /* The WebPay transaction type. */
    transactionType: string;

    /* The WebPay transaction response code. */
    transactionResponseCode: string;
    
    /* The WebPay transaction response text. */
    transactionResponseText: string;
    
    /* The merchant order number used in the WebPay transaction. */
    orderNumber: string;

    /* The bin (first 6 digits) of the credit card number used in the WebPay transaction. */
    bin: string;
    
    /* The suffix (last 4 digits) of the credit card number used in the WebPay transaction. */
    cardSuffix: string;

    /* The month of the expiry date of the credit card. */
    expiryMonth: string;

    /* The year of the expiry date of the credit card. */
    expiryYear:	string;
    
    /* The amount of the WebPay transaction. */
    amount: number;
    
    /* The import process result for the credit card instrument. */
    result: "OK" | "DUP" |  "EXP" | "ERROR" ;

    errorMessage: {
        description?: string;
    }
}

/**
 * The JSON response structure of the Import Payment Instruments endpoint.
 *
 * @category Model
 */
interface ImportPaymentInstrumentsResponse {
    /* The IDM (Gigya) UID or merchant shopper id of the user. Do NOT use an email address! */
    uid: string;

    /* The merchant shopper id of the user. */
    shopperId: string;
    
    creditCards?: CreditCardResult[];
    payPal?: {
        /* The Paypal customer id. */
        customerId: string;
        
        /* The Paypal email id. */
        payPalId: string;
        
        /* The Paypal payment method token.*/
        paymentMethodToken:	string;

        /* The import process result for the paypal instrument. */
        result: "OK" | "DUP" | "EXP" | "ERROR";
        
        /* The import process error message if "result" is "ERROR". Will be null if "result" is not "ERROR". */
        errorMessage?: {
            description: string;	
        }
    }
}

/**
 * The JSON request structure of the Tokenize Android Pay endpoint.
 *
 * @category Model
 */
interface TokenizeAndroidPayRequest{ 

    /** The "encryptedMessage" value from the Android Pay wallet.*/
    encryptedMessage: string;
    
    /** The "ephemeralPublicKey" value from the Android Pay wallet. */
    ephemeralPublicKey:	string;
    
    /** The "tag" value from the Android Pay wallet. */
    tag: string;
    
    /** The "publicKeyHash" value from the merchant profile response. */
    publicKeyHash: string;

    /** The type/schema value from the Android Pay wallet. */
    instrumentType:	string;

    /** A flag to indicate if this payment instrument has to be set as the primary instrument. */
    primary: boolean
    
    /** The display text returned by the Android Pay wallet. */
    comment: string
}
    
/**
 * The JSON response structure of the Tokenize Android Pay endpoint.
 *
 * @category Model
 */
interface TokenizeAndroidPayResponse{
    /** The new payment instrument id to be used for payments. */
    paymentInstrumentId: string;
    
    /** The step-up token to be used for payments. */
    stepUpToken: string;
}
    