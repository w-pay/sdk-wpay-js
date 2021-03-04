import { TransactionHistoryRequest } from "../../model/WalletManagementModel/TransactionHistoryRequest";
import { TransactionHistoryResponse } from "../../model/WalletManagementModel/TransactionHistoryResponse";

export interface TransactionsApi {
	/**
	 * Get the transaction history of a consumer.
	 *
	 * @param transactionHistoryRequest Detail about transactions to recieve history for.
	 */
	history(
		transactionHistoryRequest: TransactionHistoryRequest
	): Promise<TransactionHistoryResponse>;
}
