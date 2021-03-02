"use strict";

exports.ChallengeResponseType = {
	STEP_UP: "STEP_UP",
	PASSCODE: "PASSCODE"
};

exports.HealthCheckStatus = {
	SUCCESS: "SUCCESS"
};

exports.PaymentInstrumentStatus = {
	UNVERIFIED_PERSISTENT: "UNVERIFIED_PERSISTENT",
	VERIFIED: "VERIFIED"
};

exports.QRCodePaymentReferenceType = {
	PAYMENT_REQUEST: "PAYMENT_REQUEST",
	PAYMENT_SESSION: "PAYMENT_SESSION"
};

exports.TransactionSummaryPaymentType = {
	PAYMENT: "PAYMENT",
	REFUND: "REFUND"
};

exports.TransactionSummaryPaymentStatus = {
	PROCESSING: "PROCESSING",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED"
};

exports.TransactionSummaryRollback = {
	REQUIRED: "REQUIRED",
	NOT_REQUIRED: "NOT_REQUIRED",
	FAILED: "FAILED",
	SUCCESSFUL: "SUCCESSFUL"
};

exports.Wallet = {
	MERCHANT: "MERCHANT",
	EVERYDAY_PAY: "EVERYDAY_PAY"
};
