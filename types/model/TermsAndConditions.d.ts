import { PaymentInstrumentStatus } from "./PaymentInstruments";

/**
 * Properties of a Payment Agreement
 *
 * @category Model
 */
export interface PaymentAgreement {
    /** The type of the Ts and Cs. */
    type: string;
    
    /** The version of the Ts and Cs. */
    version: string;

    /** The timestamp when the shopper/customer agreed to the Everyday Pay Ts and Cs.  The timestamp format is milliseconds since epoch. */
    timestamp: number;
}

/**
 * List of terms and conditions acceptances
 *
 * @category Model
 */
export interface TermsAndConditions {
	/** An array of Ts and Cs the customer has accepted.. */
	termsAndConditionsAcceptances: PaymentAgreement[];
}