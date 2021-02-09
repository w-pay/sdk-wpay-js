import {
	AdministrationApiRepository,
	ApiAuthenticator,
	CustomerPaymentRequestsRepository,
	CustomerPaymentSessionsRepository,
	CustomerPreferencesRepository,
	CustomerTransactionsRepository,
	HasAccessToken,
	MerchantPaymentSessionsRepository,
	MerchantPaymentsRepository,
	MerchantPreferencesRepository,
	MerchantTransactionsRepository,
	PaymentInstrumentsRepository,
	QRCodeRepository,
	RequestHeadersFactory,
	SchemasRepository,
	WPayCustomerApiRepository,
	WPayMerchantApiRepository,
	WPayOptions
} from "../src";
import { instance, mock } from "ts-mockito";

export class StubApiRepository {
	constructor(
		public options: WPayOptions,
		public headers: RequestHeadersFactory,
		private authenticator: ApiAuthenticator<HasAccessToken>
	) {}

	authenticate(): Promise<HasAccessToken> {
		return this.authenticator.authenticate();
	}
}

export class StubWPayCustomerApiRepository
	extends StubApiRepository
	implements WPayCustomerApiRepository {
	admin: AdministrationApiRepository;
	instruments: PaymentInstrumentsRepository;
	paymentRequests: CustomerPaymentRequestsRepository;
	paymentSessions: CustomerPaymentSessionsRepository;
	preferences: CustomerPreferencesRepository;
	transactions: CustomerTransactionsRepository;

	constructor(
		options: WPayOptions,
		headers: RequestHeadersFactory,
		authenticator: ApiAuthenticator<HasAccessToken>
	) {
		super(options, headers, authenticator);

		this.admin = instance(mock<AdministrationApiRepository>());
		this.instruments = instance(mock<PaymentInstrumentsRepository>());
		this.paymentRequests = instance(mock<CustomerPaymentRequestsRepository>());
		this.paymentSessions = instance(mock<CustomerPaymentSessionsRepository>());
		this.preferences = instance(mock<CustomerPreferencesRepository>());
		this.transactions = instance(mock<CustomerTransactionsRepository>());
	}
}

export class StubWPayMerchantApiRepository
	extends StubApiRepository
	implements WPayMerchantApiRepository {
	admin: AdministrationApiRepository;
	paymentSession: MerchantPaymentSessionsRepository;
	payments: MerchantPaymentsRepository;
	preferences: MerchantPreferencesRepository;
	qr: QRCodeRepository;
	schemas: SchemasRepository;
	transactions: MerchantTransactionsRepository;

	constructor(
		options: WPayOptions,
		headers: RequestHeadersFactory,
		authenticator: ApiAuthenticator<HasAccessToken>
	) {
		super(options, headers, authenticator);

		this.admin = instance(mock<AdministrationApiRepository>());
		this.paymentSession = instance(mock<MerchantPaymentSessionsRepository>());
		this.payments = instance(mock<MerchantPaymentsRepository>());
		this.preferences = instance(mock<MerchantPreferencesRepository>());
		this.qr = instance(mock<QRCodeRepository>());
		this.schemas = instance(mock<SchemasRepository>());
		this.transactions = instance(mock<MerchantTransactionsRepository>());
	}
}
