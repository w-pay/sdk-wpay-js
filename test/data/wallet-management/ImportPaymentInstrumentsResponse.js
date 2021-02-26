exports.ImportPaymentInstrumentsResponseDTO = () => ({
  "uid": "61ea4c7310df484d91e15cd6ad883ccb",
  "shopperId": "12345",
  "creditCards": [
    {
      "transactionRef": "2000000009719570",
      "transactionTimestamp": "2017-09-26T23:11:27.000Z",
      "transactionType": "PURCHASE",
      "transactionResponseCode": "00",
      "transactionResponseText": "APPROVED",
      "orderNumber": "20170505090",
      "bin": "543048",
      "cardSuffix": "4307",
      "expiryMonth": "01",
      "expiryYear": "19",
      "amount": 75.5,
      "result": "OK"
    }
  ],
  "payPal": {
    "customerId": "690238314",
    "payPalId": "jane.doe@paypal.com",
    "paymentMethodToken": "I7wME6uOKgsq3fz3y52s",
    "result": "OK"
  }
});
  