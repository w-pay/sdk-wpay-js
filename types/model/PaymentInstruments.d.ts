/**
 * All the possible {@link PaymentInstrument}s that a customer might have in a wallet.
 *
 * @category Model
 */
export interface WalletContents extends PaymentInstruments {
	/**
	 * A list of payment instruments stored in the customers EverydayPay wallet
	 *
	 * @returns `null` if the wallet is not the customers EverydayPay wallet.
	 */
	everydayPay?: PaymentInstruments;
}

/**
 * List of grouped payment instruments.
 *
 * @category Model
 */
export interface PaymentInstruments {
	/** List of added credit cards */
	creditCards: CreditCard[];

	/** List of added gift cards */
	giftCards: GiftCard[];
}

/**
 * Common properties to all {@link PaymentInstruments}
 *
 * @category Model
 */
export interface PaymentInstrument {
	/** The payment instrument id. */
	paymentInstrumentId: string;

	/** Indicates if the merchant profile in the container allows the use of this payment instrument. */
	allowed: boolean;

	/** The timestamp for when the payment instrument was added. */
	createdOn: Date;

	/** The timestamp the payment instrument was last updated in the container. */
	lastUpdated: Date;

	/** The timestamp the payment instrument was last used in the container. */
	lastUsed?: Date;

	/** The payment token is a unique identifier for the payment instrument. */
	paymentToken: string;

	/** Indicates that this payment instrument is the primary instrument in the container. */
	primary: boolean;

	/** The status of the payment instrument in the container. */
	status: PaymentInstrumentStatus;
}

/**
 * Verification state for a {@link PaymentInstrument}
 *
 * @category Model
 */
export enum PaymentInstrumentStatus {
	UNVERIFIED_PERSISTENT = "UNVERIFIED_PERSISTENT",
	VERIFIED = "VERIFIED"
}

export interface CardPaymentInstrument extends PaymentInstrument {
	/** The suffix (last 4 digits) of the card number. */
	cardSuffix: string;
}

/**
 * An added credit card
 *
 * @category Model
 */
export interface CreditCard extends CardPaymentInstrument {
	/** The nickname of the credit card instrument in the container. */
	cardName: string;

	/** Indicates if the CVV of the credit card has been validated. */
	cvvValidated: boolean;

	/** Indicates if the credit card is expired. */
	expired: boolean;

	/** The month of the expiry date of the credit card. */
	expiryMonth: string;

	/** The year of the expiry date of the credit card. */
	expiryYear: string;

	/** Indicates if payments with this credit card requires a CVV check. */
	requiresCVV: boolean;

	/** The credit card scheme. */
	scheme: string;

	/** The URL of an iframe. This iframe is used to capture a credit card expiry and CVV. */
	updateURL: URL;

	/** Whether a {@link ChallengeResponse} is required to make a payment with this card */
	stepUp: CreditCardStepUp;
}

/**
 * An added gift card.
 *
 * @category Model
 */
export interface GiftCard extends CardPaymentInstrument {
	/** The gift card program name. */
	programName: string;

	/** Whether a {@link ChallengeResponse} is required to make a payment with this card */
	stepUp?: GiftCardStepUp;
}

/**
 * Details of what step up is required to use a {@link CreditCard}
 *
 * @category Model
 */
export interface CreditCardStepUp {
	/** This will be CAPTURE_CVV which identifies that the consumer must capture the CVV prior to payment. */
	type: string;

	/** Indicates if this step up is mandatory. */
	mandatory: boolean;

	/** The URL of an iframe. This iframe is used to capture a credit card expiry and CVV or CVV only. */
	url: URL;
}

/**
 * Details of what step up is required to use a {@link GiftCard}
 *
 * @category Model
 */
export interface GiftCardStepUp {
	/** This will be REQUIRE_PASSCODE which identifies that the consumer must capture the PIN prior to payment. */
	type: string;

	/** Indicates if this step up is mandatory. */
	mandatory: boolean;
}

/**
 * Used to identify other {@link PaymentInstrument}s to be used as part of a payment.
 *
 * @category Model
 */
export interface SecondaryPaymentInstrument {
	/** The ID of the payment instrument */
	paymentInstrumentId: string;

	/** The amount of the payment to be paid using this instrument. */
	amount: number;
}

export interface IndividualPaymentInstrument extends PaymentInstrument {
	/** The type of the payment instrument. */
	paymentInstrumentType: string;
	paymentInstrumentDetail: {
		/** The gift card program name. */
		programName: string;

		/** What {@link ChallengeResponse} is required to make a payment with this instrument */
		stepUp: GiftCardStepUp;
	};

	/** An encrypted JSON object containing sensitive data */
	cipherText?: string;
}
