import { TermsAndConditionsAcceptances } from "../model";

/**
 * @category API
 */
export interface CustomerTermsAndConditionsApi {
	/**
	 * Get the terms and conditions agreed to by the customer
	 *
	 * @param type The type of Ts and Cs that the shopper/customer has agreed to. Defaults to all if absent
	 * @param version The version of Ts and Cs that the shopper/customer has agreed to.  Defaults to all if absent
	 */
	get(type?: string, version?: string): Promise<TermsAndConditionsAcceptances[]>;
}
