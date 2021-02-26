exports.ListPaymentInstrumentsResponseDTO = () => ({
    "creditCards": [
      {
        "paymentInstrumentId": "90731",
        "paymentToken": "712029a1-c0aa-41bc-a810-3d42424c5834",
        "status": "UNVERIFIED_PERSISTENT",
        "lastUpdated": "2017-11-06T08:38:09.890Z",
        "lastUsed": "2017-11-06T08:38:09.890Z",
        "createdOn": "2017-11-06T08:38:09.890Z",
        "primary": true,
        "allowed": true,
        "expiryYear": "21",
        "expiryMonth": "05",
        "scheme": "MASTERCARD",
        "cardSuffix": "6106",
        "cvvValidated": false,
        "cardName": "My Card",
        "expired": false,
        "requiresCVV": true,
        "updateURL": "https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvvExpiry/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731",
        "stepUp": {
          "type": "CAPTURE_CVV",
          "mandatory": true,
          "url": "https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvv/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
        }
      }
    ],
    "giftCards": [
      {
        "paymentInstrumentId": "81054",
        "paymentToken": "ec9b062a-220a-43b3-8185-a8ca4fc4dc0c",
        "status": "UNVERIFIED_PERSISTENT",
        "lastUpdated": "2017-11-06T08:38:09.860Z",
        "lastUsed": "2017-10-12T02:25:49.770Z",
        "createdOn": "2017-11-06T08:38:09.890Z",
        "primary": false,
        "allowed": true,
        "programName": "WISH Gift Card",
        "cardSuffix": "2517",
        "stepUp": {
          "type": "REQUIRE_PASSCODE",
          "mandatory": true,
          "url": "https://uat.woolworthspay.com.au/container-ws/tbd"
        }
      }
    ],
    "payPal": [
      {
        "paymentInstrumentId": "90271",
        "paymentToken": "15f774d0-e42e-11e9-a359-2a2ae2dbcce4",
        "status": "UNVERIFIED_PERSISTENT",
        "lastUpdated": "2017-11-06T08:38:09.860Z",
        "lastUsed": "2017-11-06T08:38:09.860Z",
        "createdOn": "2017-11-06T08:38:09.890Z",
        "primary": false,
        "allowed": true,
        "payPalId": "jane.doe@paypal.com",
        "customerId": "690238314"
      }
    ],
    "paymentAgreements": [
      {
        "paymentToken": "27e07e4e-58df-4072-8e75-33dd464af667",
        "status": "VERIFIED",
        "lastUpdated": "2018-09-01T00:00:00.000+1100",
        "lastUsed": "2018-09-14T12:00:00.000+1100",
        "createdOn": "2017-11-06T08:38:09.890Z",
        "primary": false,
        "allowed": true,
        "type": "RECURRING",
        "paymentInstrumentId": "90731",
        "scheme": "VISA",
        "cardSuffix": "4405",
        "expiryMonth": "11",
        "expiryYear": "22",
        "startDate": "2018-09-01T00:00:00.000+1100",
        "endDate": "2018-12-31T23:59:59.999+1100",
        "chargeFrequency": "WEEKLY",
        "chargeAmount": 25.99,
        "chargeCycle": 2,
        "expired": false,
        "updateURL": "https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/paymentagreements/27e07e4e-58df-4072-8e75-33dd464af667",
        "stepUp": {
          "type": "CAPTURE_CVV",
          "mandatory": true,
          "url": "https://uat.woolworthspay.com.au/container-ws/getCaptureFrame/cvv/353629ec-4cb5-4fc3-ab47-8c9c3f117ab8/90731"
        }
      }
    ],
    "googlePay": {
      "paymentInstrumentId": "201155",
      "paymentToken": "76a4c2f1-7620-4bc4-8f4f-01c1467ea318",
      "status": "VERIFIED",
      "lastUpdated": "2017-09-20T06:20:18.173Z",
      "lastUsed": "2017-07-28T02:58:56.187Z",
      "createdOn": "2017-11-06T08:38:09.890Z",
      "primary": false,
      "allowed": true,
      "expired": true,
      "stepUp": {
        "type": "REFRESH_TOKEN",
        "mandatory": true,
        "url": "https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/googlepay/tokenize/201155"
      }
    },
    "applePay": {
      "paymentInstrumentId": "16161",
      "paymentToken": "64dee650-e42e-11e9-81b4-2a2ae2dbcce4",
      "status": "VERIFIED",
      "lastUpdated": "2017-07-28T02:58:56.187Z",
      "lastUsed": "2017-09-20T06:20:18.173Z",
      "createdOn": "2017-11-06T08:38:09.890Z",
      "primary": false,
      "allowed": true,
      "stepUp": {
        "type": "REFRESH_TOKEN",
        "mandatory": true,
        "url": "https://{environment}.mobile-api.woolworths.com.au/wow/v1/pay/applepay/tokenize/16161"
      }
    }
  });
  