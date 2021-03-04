/**
 * The JSON request structure of the Transaction History endpoint.
 *
 * @category Model
 */
export interface TransactionHistoryRequest {
	/* The container transaction types to include in the results. */
	transactionTypes: "PREAUTH" | "PURCHASE" | "COMPLETION" | "VOID" | "REFUND"[];

	/* The ids of the payment instruments to include in the results. */
	paymentInstrumentIds: string[];

	/* A merchant application specific reference number to include in the results. */
	clientReference: string;

	/* A container reference number to include in the results. */
	transactionRef: string;

	/* A merchant order number to include in the results. */
	orderNumber: string;

	/* Limit transactions included in the results FROM this timestamp. The timestamp format is ISO8601. */
	startDate: string;

	/* Limit transactions included in the results TO this timestamp . The timestamp format is ISO8601. */
	endDate: string;

	/* The max number of transactions to include in the results. */
	maxRecords: number;
}
