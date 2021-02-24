/**
 * A customer's address
 *
 * @category Model
 */
export interface DigitalPayAddress {
    /** The recipient's first name. */
    firstName: string;

    /** The recipient's last name. */
    lastName: string;

    /** The recipient’s email address. */
    email?: string;
        
    /** The recipient's company name. */
    company?: string;

    /** The recipient's extended address line. */
    extendedAddress?: string;

    /** The recipient's street address line. */
    streetAddress: string;
            
    /** The recipient's suburb. */
    suburb: string;

    /** The recipient's abbreviated state or territory. */
    stateOrTerritory: string;

    /** The recipient's postal code */
    postalCode: string;

    /** The recipient's Alpha-2 (2-character) ISO-3166-1 country code. */
    countryCode: string;
}