/**
 * List of terms and conditions acceptances
 *
 * @category Model
 */
export interface TermsAndConditionsAcceptances {
	/** An array of Ts and Cs the customer has accepted.. */
	termsAndConditionsAcceptances: TermsAndConditionsAcceptance[];
}

/**
 * The Terms and Condtions the customer has accepted.
 *
 * @category Model
 */
export interface TermsAndConditionsAcceptance {
	/** The type of the Ts and Cs. */
	type: string;

	/** The version of the Ts and Cs. */
	version: string;

	/** The timestamp when the shopper/customer agreed to the Everyday Pay Ts and Cs.  The timestamp format is milliseconds since epoch. */
	timestamp: number;
}
