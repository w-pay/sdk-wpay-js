import { AndroidPayApi } from "../WalletManagement/AndroidPay";
import { ApplePayApi } from "../WalletManagement/ApplePay";
import { CardsApi } from "../WalletManagement/Cards";
import { GiftcardsApi } from "../WalletManagement/Giftcards";
import { GooglePayApi } from "../WalletManagement/GooglePay";
import { InstrumentsApi } from "../WalletManagement/Instruments";
import { MerchantsApi } from "../WalletManagement/Merchants";
import { OpenPayApi } from "./OpenPay";
import { PayPalApi } from "../WalletManagement/Paypal";
import { PaymentAgreementApi } from "./PaymentAgreements";
import { PaymentApi } from "./Payments";
import { TransactionsApi } from "../WalletManagement/Transactions";
import { WalletApi } from "../WalletManagement/Wallet";
import { GiftingApi } from "./Gifting";

export * from "./OpenPay";
export * from "./PaymentAgreements";
export * from "./Payments";

/**
 * All the APIs that proxy directly to DigitalPay
 *
 * @category API
 */
export interface DigitalPayApi {
	androidPay: AndroidPayApi;
	applePay: ApplePayApi;
	cards: CardsApi;
	giftcards: GiftcardsApi;
	gifting: GiftingApi;
	googlePay: GooglePayApi;
	instruments: InstrumentsApi;
	merchants: MerchantsApi;
	openPay: OpenPayApi;
	paymentAgreements: PaymentAgreementApi;
	payments: PaymentApi;
	paypal: PayPalApi;
	transactions: TransactionsApi;
	wallet: WalletApi;
}
