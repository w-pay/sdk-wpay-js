import { Basket } from "./Basket";
import { MerchantPayload } from "./MerchantPayload";
import { PosPayload } from "./PosPayload";
import { TransactionSummary } from "./TransactionSummary";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MerchantTransactions {}

/**
 * List of merchant transactions.
 *
 * @category Model
 */
export interface MerchantTransactionSummaries extends MerchantTransactions {
	/** The resulting list of transactions. */
	transactions: MerchantTransactionSummary[];
}

/**
 * Summary information of the resulting transaction
 *
 * @category Model
 */
export interface MerchantTransactionSummary extends TransactionSummary {
	/** The ID of the wallet associated with this transaction */
	walletId: string;
}

/**
 * Detailed information for a single transaction
 *
 * @category Model
 */
export interface MerchantTransactionDetails extends MerchantTransactionSummary {
	/** The {@link Basket} associated to the transaction. */
	basket?: Basket;

	/** Optional extra details from the POS. */
	posPayload?: PosPayload;

	/** Optional extra details from the merchant. */
	merchantPayload?: MerchantPayload;
}
