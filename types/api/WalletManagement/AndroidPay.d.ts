/**
 * @category API
 */
export interface AndroidPay {
	/**
	 * Create a payment instrument id for a provided Android Pay wallet item.
	 *
	 * @param 
	 */
	tokenize(tokenizeAndroidPayRequest: TokenizeAndroidPayRequest): Promise<TokenizeAndroidPayResponse>;

    /**
	 * Update an Android Pay payment instrument.
	 *
	 * @param 
     * @param 
	 */
	update(paymentInstrumentId: string, tokenizeAndroidPayRequest: TokenizeAndroidPayRequest): Promise<TokenizeAndroidPayResponse>;
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
    