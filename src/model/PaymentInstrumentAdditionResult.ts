/**
 * The result of trying to initiate the addition of a new {@link PaymentInstrument}
 */
export interface PaymentInstrumentAdditionResult {
	/** The URL of an iframe. This iframe is used to capture a credit card number, expiry and CVV */
	cardCaptureURL: string;

	/** Container reference in the transaction logs. This number uniquely identifies the transaction in the container */
	transactionRef?: string;
}
