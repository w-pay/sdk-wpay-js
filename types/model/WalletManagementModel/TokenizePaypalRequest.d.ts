/**
 * The JSON request structure of the Tokenize Paypal endpoint.
 *
 * @category Model
 */
export interface TokenizePaypalRequest{
    /* The Paypal nonce that will be used during a Paypal payment. */
    nonce: string;
    
    /* A flag to indicate if this payment instrument has to be set as the primary instrument. */
    primary: boolean;
}