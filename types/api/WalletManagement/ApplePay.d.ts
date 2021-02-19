/**
 * @category API
 */
export interface ApplePay {
	/**
	 * Create a payment instrument id for a provided Apple Pay wallet item.
	 *
	 * @param 
	 */
	tokenize(tokenizeApplePayRequest: TokenizeApplePayRequest): Promise<TokenizeApplePayResponse>;

    /**
	 * Update an Apple Pay payment instrument.
	 *
	 * @param 
     * @param 
	 */
	update(paymentInstrumentId: string, tokenizeApplePayRequest: TokenizeApplePayRequest): Promise<TokenizeApplePayResponse>;
}

/**
 * The JSON request structure of the Tokenize Apple Pay endpoint.
 *
 * @category Model
 */
interface TokenizeApplePayRequest{
    /* The "data" value from the Apple Pay wallet. */
    data: string;
    
    /* The "ephemeralPublicKey" value from the Apple Pay wallet. */
    ephemeralPublicKey: string;
    
    /* The "publicKeyHash" value from the Apple Pay wallet. */
    publicKeyHash: string;
    
    /* The "transactionId" value from the Apple Pay wallet. */
    transactionId: string;
    
    /* The "signature" value from the Apple Pay wallet. */
    signature: string;
    
    /* The "version" value from the Apple Pay wallet. */
    version: string;
    
    /* The type/schema value from the Apple Pay wallet. */
    instrumentType: string;
    
    /* A flag to indicate if this payment instrument has to be set as the primary instrument. */
    primary: boolean;
    
    /* The display text returned by the Apple Pay wallet. */
    comment: string
    
    /* The "applicationData" value from the Apple Pay wallet. */
    applicationData: string;
}

/**
 * The JSON response structure of the Tokenize Android Pay endpoint.
 *
 * @category Model
 */
interface TokenizeApplePayResponse{
    /** The new payment instrument id to be used for payments. */
    paymentInstrumentId: string;
    
    /** The step-up token to be used for payments. */
    stepUpToken: string;
}
