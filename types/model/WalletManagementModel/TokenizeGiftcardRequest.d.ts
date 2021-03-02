/**
 * The JSON request structure of the Tokenize Giftcard endpoint.
 *
 * @category Model
 */
export interface TokenizeGiftcardRequest {
	/* The gift card number. */
	cardNumber: string;

	/* The gift card pin code. */
	pinCode: string;

	/* A flag to indicate if this payment instrument has to be set as the primary instrument. */
	primary: boolean;

	/* A flag to indicate if this payment instrument has to be saved in the container or tokenized for one-off use. */
	save: boolean;
}
