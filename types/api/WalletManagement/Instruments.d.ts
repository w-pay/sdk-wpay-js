import { ImportPaymentInstrumentsRequest } from "../../model/WalletManagementModel/ImportPaymentInstrumentsRequest";
import { ImportPaymentInstrumentsResponse } from "../../model/WalletManagementModel/ImportPaymentInstrumentsResponse";
import { ListPaymentInstrumentsRequest } from "../../model/WalletManagementModel/ListPaymentInstrumentsRequest";
import { ListPaymentInstrumentsResponse } from "../../model/WalletManagementModel/ListPaymentInstrumentsResponse";
import { VerifyPaymentInstrumentsRequest } from "../../model/WalletManagementModel/VerifyPaymentInstrumentsRequest";
import { VerifyPaymentInstrumentsSuccessResponse } from "../../model/WalletManagementModel/VerifyPaymentInstrumentsSuccessResponse";

/**
 * @category API
 */
export interface InstrumentsApi {
	/**
	 * Import a consumers credit cards (from WebPay) and paypal accounts to a new wallet. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param importPaymentInstrumentsRequest Details of the consumers credits and paypal accounts to be imported.
	 */
	import(
		importPaymentInstrumentsRequest: ImportPaymentInstrumentsRequest
	): Promise<ImportPaymentInstrumentsResponse>;

	/**
	 * Verify if a provided payment instrument is valid and optionally perform a fraud check on the instrument.
	 *
	 * @param verifyPaymentInstrumentsRequest Details of the payment instrument to be verified.
	 */
	verify(
		verifyPaymentInstrumentsRequest: VerifyPaymentInstrumentsRequest
	): Promise<VerifyPaymentInstrumentsSuccessResponse>;

	/**
	 * Get the stored payment intruments of a consumer.
	 */
	getList(): Promise<ListPaymentInstrumentsResponse>;

	/**
	 * Get the stored payment intruments of a consumer. This API is IP restricted to allow unauthenticated server side calls.
	 *
	 * @param listPaymentInstrumentsRequest Details of the consumer to list payment instruments for.
	 */
	postList(
		listPaymentInstrumentsRequest: ListPaymentInstrumentsRequest
	): Promise<ListPaymentInstrumentsResponse>;

	/**
	 * Delete a stored payment intrument of a consumer.
	 *
	 * @param paymentInstrumentId The id of the payment instrument to delete.
	 */
	delete(paymentInstrumentId: string): Promise<Record<string, unknown>>;
}
