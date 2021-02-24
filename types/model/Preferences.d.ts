/**
 * Available preference settings for a customer
 * 
 * @category Model
 */
export interface CustomerPreferences {
    /** Payment preferences for a customer */
    payments?: PaymentPreferences;
    /** Map of general preferences. */
    general?: Preferences;
}

/**  
 * Payment preferences for a customer
 * 
 * @category Model
 */
export interface PaymentPreferences {
    /** 
     * The primary instrument that will be used by default for a payment if a specific instrument is not specified.  
     * 
     * The primary instrument will be used for the balance of the payment after any specified secondary instruments are used first. 
     */
    primaryInstrumentId: string;

    /** 
     * Rules for the creation of a default set of secondary instruments to be used for a payment if a specific set is not specified. 
     * 
     *  Secondary instruments are used in order until the full amount of the payment has been paid. 
     */
    secondaryInstruments: SecondaryInstrumentPreferences; 
}

export interface SecondaryInstrumentPreferences {
    /**
     * Flag indicating whether secondary instruments are enabled or disabled.  
     * 
     * If not present defaults to enabled. Used to specifically disable secondary instruments without losing customer configure preferences.
     */
    enableSecondaryInstruments?: boolean;
    
    /** The order that the secondary instruments will be used for a specific payment. */
    order?: SecondaryInstrumentOrder;

    /**
     * Array of instruments to exclude from the secondary instruments set.
     * 
     * Indicates that the set of secondary instruments should include all valid instruments excluding those in this list.
     */
    exclude?: string[];
    
    /**
     * Array of instruments to specifically include in the secondary instruments set.
     * 
     * Indicates that the set of secondary instruments should start as empty and only include all valid instruments excluding those in this list.
     */
    include?: string[];
}

export enum SecondaryInstrumentOrder {
    BALANCE_ASC = "BALANCE_ASC",
    BALANCE_DESC = "BALANCE_DESC",
    EXPIRY_ASC = "EXPIRY_ASC",
    EXPIRY_DESC = "EXPIRY_DESC",
    FIFO = "FIFO",
    LIFO = "LIFO",
    INCLUDE_ORDER = "INCLUDE_ORDER"
}

/**
 * Map of general preferences.
 *
 * @category Model
 */
export type Preferences = Map<string, Map<string, string>>;
