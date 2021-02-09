import { AdministrationApiRepository } from "./api";
import { ApiAuthenticator, HasAccessToken } from "./auth";
import { MerchantPaymentsRepository } from "./api";
import { MerchantPaymentSessionsRepository } from "./api";
import { MerchantPreferencesRepository } from "./api";
import { MerchantTransactionsRepository } from "./api";
import { QRCodeRepository } from "./api";
import { SchemasRepository } from "./api";
import { WPayOptions } from "./WPayOptions";

/**
 * Defines the API operations that the SDK can use to call the WPay Merchant API
 *
 * The SDK is technology agnostic with applications being able to choose an implementation that
 * meets the needs and preexisting technology choices of the application.
 *
 * Implementations of the protocol may provide additional constraints on the user.
 */
export interface WPayMerchantApiRepository<A extends HasAccessToken = HasAccessToken>
	extends ApiAuthenticator<A> {
	admin: AdministrationApiRepository;
	payments: MerchantPaymentsRepository;
	paymentSession: MerchantPaymentSessionsRepository;
	preferences: MerchantPreferencesRepository;
	qr: QRCodeRepository;
	schemas: SchemasRepository;
	transactions: MerchantTransactionsRepository;

	/**
	 * Options that were given at SDK initialisation
	 */
	options: WPayOptions;
}
