exports.VerifyPaymentInstrumentsResponseDTO = () => ({
  "transactionReceipt": "1000000009303280",
  "partialSuccess": false,
  "fraudResponse": {
    "clientId": "5615334856056397603065",
    "reasonCode": "100",
    "decision": "ACCEPT"
  },
  "verifyResponses": [
    {
      "paymentToken": "f63fbfa8-0a2f-48a6-9162-6b102161a05b",
      "verifyTransactionRef": "1000000009303281",
      "externalServiceCode": "00",
      "externalServiceMessage": "ACCEPTED"
    }
  ]
});