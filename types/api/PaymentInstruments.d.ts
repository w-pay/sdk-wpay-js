import {
	WalletContents,
	IndividualPaymentInstrument,
	PaymentInstrumentIdentifier
} from "../model";
import { PaymentInstrumentAddition } from "../model";
import { PaymentInstrumentAdditionResult } from "../model";
import { Wallet } from "../model";

/**
 * @category API
 */
export interface PaymentInstrumentsApi {
	/**
	 * Get the specified payment instrument of the customer.
	 *
	 * @param paymentToken The payment token of the payment instrument to fetch.
	 * @param wallet What wallet the instrument is in.
	 * @param publicKey A public key used to encrypt sensitive instrument data and include that encrypted data in the response sent back to the consumer.
	 */
	getByToken(
		paymentToken: string,
		wallet: Wallet,
		publicKey?: string
	): Promise<IndividualPaymentInstrument>;

	/**
	 * Retrieve the customer's registered {@link PaymentInstrumentsApi}
	 *
	 * @param wallet Whether to return only instruments registered by the customer for the merchant, or for the merchant and Everyday Pay
	 */
	list(wallet: Wallet): Promise<WalletContents>;

	/**
	 * Delete a {@link PaymentInstrument} from a {@link Wallet}
	 *
	 * @param instrument The payment instrument to delete.
	 */
	delete(instrument: PaymentInstrumentIdentifier): Promise<void>;

	/**
	 * Initiate the addition of a new {@link PaymentInstrument} for the customer.
	 *
	 * To complete the addition the customer will have to use the returned URL details to enter
	 * the instrument details.
	 *
	 * @param instrument Initial details to begin the addition workflow.
	 */
	initiateAddition(
		instrument: PaymentInstrumentAddition
	): Promise<PaymentInstrumentAdditionResult>;
}
