import { Basket } from "./Basket";
import { TransactionSummary } from "./TransactionSummary";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomerTransactions {}

/**
 * List of customer transactions
 *
 * @category Model
 */
export interface CustomerTransactionSummaries extends CustomerTransactions {
	/** The resulting list of transactions. */
	transactions: CustomerTransactionSummary[];
}

/**
 * Summary information of a transaction performed by a customer
 *
 * @category Model
 */
export interface CustomerTransactionSummary extends TransactionSummary {
	/** The ID of the merchant associated with this transaction */
	merchantId: string;
}

/**
 * Detailed information for a single transaction
 *
 * @category Model
 */
export interface CustomerTransactionDetails extends CustomerTransactionSummary {
	/** The {@link Basket} associated to the the transaction */
	basket?: Basket;
}
