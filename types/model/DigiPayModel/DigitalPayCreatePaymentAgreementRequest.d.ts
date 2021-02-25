import { PaymentAgreementChargeFrequency, PaymentAgreementType } from "../PaymentAgreement";
import { DigitalPayAddress } from "./DigitalPayAddress";
import { DigitalPayFraudPayload } from "./DigitalPayFraudPayload";

/**
 * The JSON request structure of the Create Payment Agreement endpoint.
 *
 * @category Model
 */
export interface DigitalPayCreatePaymentAgreementRequest {
    /** 
     * A merchant application specific reference number. 
     * 
     * This number should uniquely identify the transaction in the merchant’s system. 
     */
    clientReference: string;
    
    /** 
     * A merchant application specific reference number. 
     * 
     * This number should uniquely identify the customer in the merchant’s system. 
     */
    customerRef?: string;
    
    /** 
     * The merchant order number of the transaction. 
     * 
     * This property is only required if the 'immediateCharge' property is true. 
     */
    orderNumber?: string;

    /** Customer billing address for this payment agreement */
    billingAddress: DigitalPayAddress;

    /** Detail of the payment agreement to be created */
    paymentAgreement: DigitalPayPaymentAgreement;

    /** Digital pay fraud payload */
    fraudPayload?: DigitalPayFraudPayload;
}

export interface DigitalPayPaymentAgreement {
    /** The payment agreement type. */
    type: PaymentAgreementType;

    /** The payment agreement payment instrument id that will be used for the charges. */
    paymentInstrumentId: string;

    /** The payment agreement charge frequency. */
    chargeFrequency: PaymentAgreementChargeFrequency;
                
    /** The amount that will be charged at the frequency specified in the payment agreement. */
    chargeAmount: number;

    /** The payment agreement start date and time. The timestamp format is ISO8601. */
    startDate?: string;

    /** The payment agreement end date and time. The timestamp format is ISO8601. */
    endDate?: string;

    /** 
     * A flag to indicate if a charge transaction must be performed at the time of payment agreement creation. 
     * 
     * This in convenient in the cases where a customer wants to process a first charge transaction immediately at payment agreement creation. 
     */
    immediateCharge?: boolean;

    /** 
     * The step-up token is used to track additional credit card information (eg. CVV and expiry) attached to the payment instrument. 
     * 
     * It's only valid for a predefined time and if an expired step-up token is used during validation, the validation of that instrument will fail and the user will have to get a new step-up token before retrying the API call. A step-up token is returned in the response of a credit card iframe. This property is only required for credit card instruments and only if specific credit card information (eg. CVV and expiry) is required during the API call. 
     */
    stepUpToken: string;
}

