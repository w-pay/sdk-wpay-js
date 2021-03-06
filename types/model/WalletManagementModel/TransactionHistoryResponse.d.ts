import { TransactionType } from "../TransactionType";

/**
 * The JSON response structure of the Transaction History endpoint.
 *
 * @category Model
 */
export interface TransactionHistoryResponse {
	/* The number of transactions returned in the results. */
	returned: number;

	/* The total number of transactions available in the container. */
	total: number;

	transactions: Transaction[];
}

interface Transaction {
	/* The container transaction type. */
	transactionType: TransactionType;

	/* Container reference in the transaction logs. This number uniquely identifies the transaction in the container. */
	transactionRef: string;

	/* The container transaction timestamp. The timestamp format is ISO8601. */
	transactionTimestamp: string;

	/* A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system. The current implementation assigns the "clientReference" value to this property. */
	applicationRef: string;

	/* The container application name of the merchant. */
	applicationName: string;

	/* A merchant application specific reference number. This number should uniquely identify the transaction in the merchant’s system. */
	clientReference: string;

	/* The merchant order number of the transaction. */
	orderNumber: string;

	/* The bin (first 4 digits) of the card number used in the transaction. Will be null for transactions where bin is not applicable. */
	bin: string | null;

	/* The type of payment instrument used in the transaction. For credit card transactions this property will contain the scheme. */
	network: string;

	/* The suffix (last 4 digits) of the card number used in the transaction. Will be null for transactions where suffix is not applicable. */
	cardSuffix: string | null;

	/* The amount of the transaction. */
	amount: number;

	/* The comment set in the tokenization request of Google/Apple Pay instruments. Will be null for transactions where comment is not applicable. */
	comment: string;

	/* The type of the payment instrument used in the transaction. */
	paymentInstrumentType: string;
}
