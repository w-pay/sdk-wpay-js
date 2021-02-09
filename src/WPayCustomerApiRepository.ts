import { AdministrationApiRepository } from "./api";
import { ApiAuthenticator, HasAccessToken } from "./auth";
import { CustomerPaymentRequestsRepository } from "./api";
import { CustomerPaymentSessionsRepository } from "./api";
import { CustomerPreferencesRepository } from "./api";
import { CustomerTransactionsRepository } from "./api";
import { PaymentInstrumentsRepository } from "./api";
import { WPayOptions } from "./WPayOptions";

/**
 * Defines the API operations that the SDK can use to call the WPay Customer API
 *
 * The SDK is technology agnostic with applications being able to choose an implementation that
 * meets the needs and preexisting technology choices of the application.
 *
 * Implementations of the protocol may provide additional constraints on the user.
 */
export interface WPayCustomerApiRepository<A extends HasAccessToken = HasAccessToken>
	extends ApiAuthenticator<A> {
	admin: AdministrationApiRepository;
	instruments: PaymentInstrumentsRepository;
	paymentRequests: CustomerPaymentRequestsRepository;
	paymentSessions: CustomerPaymentSessionsRepository;
	preferences: CustomerPreferencesRepository;
	transactions: CustomerTransactionsRepository;

	/**
	 * Options that were given at SDK initialisation
	 */
	options: WPayOptions;
}
