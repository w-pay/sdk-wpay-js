/**
 * The JSON request structure of the Voids endpoint.
 * 
 * @category Model
 */
export interface DigitalPayVoidRequest {
    /** A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system. */
    clientReference: string;
    
    /** The merchant order number of the transaction. */
    orderNumber: string;
    
    /** List of voided payments */
    voids: DigitalPayVoid[];      
}

export interface DigitalPayVoid {
    /** Container reference in the transaction logs. This number uniquely identifies the payment transaction in the container. */
    paymentTransactionRef: string;
}