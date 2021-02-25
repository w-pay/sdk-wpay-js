import { TransactionHistoryRequest } from "../../model/WalletManagementModel/TransactionHistoryRequest";
import { TransactionHistoryResponse } from "../../model/WalletManagementModel/TransactionHistoryResponse";

export interface Transactions {
	/**
	 * Get the transaction history of a consumer.
	 *
	 * @param
	 */
	history(transactionHistoryRequest: TransactionHistoryRequest): Promise<TransactionHistoryResponse>;
}