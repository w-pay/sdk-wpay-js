import { Basket } from "./Basket";
import { TransactionSummary } from "./TransactionSummary";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomerTransactions {}

/**
 * An instrument used for a transaction
 */
export interface CustomerTransactionUsedPaymentInstrument {
	/** The ID of the {@link PaymentInstrument} */
	paymentInstrumentId: string;

	/** The amount charged against or refunded to this instrument */
	amount: number;

	/** The reference for the payment */
	paymentTransactionRef?: string;
}

/**
 * List of customer transactions
 */
export interface CustomerTransactionSummaries extends CustomerTransactions {
	/** The resulting list of transactions. */
	transactions: CustomerTransactionSummary[];
}

/**
 * Summary information of a transaction performed by a customer
 */
export interface CustomerTransactionSummary extends TransactionSummary {
	/** The ID of the merchant associated with this transaction */
	merchantId: string;

	/** The instruments used to make the payment. For refunds and cash back amounts will be negative */
	instruments: CustomerTransactionUsedPaymentInstrument[];
}

/**
 * Detailed information for a single transaction
 */
export interface CustomerTransactionDetails extends CustomerTransactionSummary {
	/** The {@link Basket} associated to the the transaction */
	basket?: Basket;
}
