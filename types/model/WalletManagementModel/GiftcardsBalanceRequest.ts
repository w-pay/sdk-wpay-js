/**
 * The JSON request structure of the Giftcards Balance endpoint.
 *
 * @category Model
 */
export interface GiftcardsBalanceRequest{
    /* Use this array if the endpoint is being called with "cardNumber" and "pinCode" request properties. */
    giftCards:	GiftCard[];
    /* Use this array if the endpoint is being called with "paymentInstrumentId" request properties. */
    giftCardInstruments: GiftCardInstrument[];
}

interface GiftCard {
    /* The gift card number. */
    cardNumber:	string;

    /* The gift card pin code. */
    pinCode: string;
}

interface GiftCardInstrument {
    /* The gift card payment instrument id. */
    paymentInstrumentId: string;
}
    