export interface DigitalPayTransactionType {
    /** The container transaction type to use for credit card instruments. */
    creditCard?: 'PREAUTH' | 'PURCHASE';
    
    /** The container transaction type to use for gift card instruments. */
    giftCard?: 'PURCHASE';
    
    /** The container transaction type to use for paypal instruments. */
    payPal?: 'PURCHASE';
            
    /** The container transaction type to use for google pay instruments. */
    googlePay?: {
        /** The container transaction type to use for google pay credit card instruments. */
        creditCard: 'PREAUTH' | 'PURCHASE';
        /** The container transaction type to use for google pay debit card instruments. */
        debitCard: 'PURCHASE';
    }

    /** The container transaction type to use for apple pay instruments. */
    applePay?: {
        /** The container transaction type to use for apple pay credit card instruments. */
        creditCard: 'PREAUTH' | 'PURCHASE';
        /** The container transaction type to use for apple pay debit card instruments. */
        debitCard: 'PURCHASE';
    }
}
