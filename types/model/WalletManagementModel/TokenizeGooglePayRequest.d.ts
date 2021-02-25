/**
 * The JSON request structure of the Tokenize Google Pay endpoint.
 *
 * @category Model
 */
export interface TokenizeGooglePayRequest{
    
    /** The type/schema value from the Google Pay wallet. */
    instrumentType: string;
    
    /** The display text returned by the Google Pay wallet. */
    comment: string;
    
    /** The "tokenData" payload from the Google Pay wallet. */
    tokenData: string;
}