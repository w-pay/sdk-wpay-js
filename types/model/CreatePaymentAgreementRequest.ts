import { PaymentAgreement } from "./PaymentAgreement";

/**
 * Common properties of the {@link PaymentAgreement} request
 *
 * @category Model
 */
export interface CommonPaymentAgreementRequest {
	/** A merchant application specific reference number for the transaction. */
    clientReference: string;
        
    /** A merchant application specific reference number for the customer. */
    customerRef?: string

    /** Merchant order number of the transaction. */
    orderNumber?: string;

    /** Description of the payment agreement. Used to distinguish payment agreements from one another. */
    description?: string
}

/**
 * Request containing the details of the {@link PaymentAgreement} to create
 *
 * @category Model
 */
export interface CreatePaymentAgreementRequest extends CommonPaymentAgreementRequest {  
    /** Billing address for the customer. */
    billingAddress: PaymentAgreementBillingAddress;

    /** Details of the payment agreement */
    paymentAgreement: PaymentAgreement
}

/**
 * Request containing the details of the {@link PaymentAgreement} to update
 *
 * @category Model
 */
export interface UpdatePaymentAgreementRequest extends CommonPaymentAgreementRequest { 
    /** Billing address for the customer. */
    billingAddress?: PaymentAgreementBillingAddress;

    /** Details of the payment agreement */
    paymentAgreement?: PaymentAgreement
}

/**
 * The customer's billing address
 *
 * @category Model
 */
export interface PaymentAgreementBillingAddress {
    /** The customer's first name. */
    firstName: string;
        
    /** The customer's last name. */
    lastName: string;

    /** The customer’s email address. */
    email: string;

    /** The customer's company name. */
    company?: string;
    
    /** The customer's extended address line. */
    extendedAddress?: string;
    
    /** The customer's street address line. */
    streetAddress: string;

    /** The customer's suburb. */
    suburb: string;

    /** The customer's abbreviated state or territory. */
    stateOrTerritory: string;

    /** The customer's postal code. */
    postalCode: string;

    /** The customer's Alpha-2 (2-character) ISO-3166-1 country code. */
    countryCode: string;
                
}
