"use strict";

const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");

const { toDate } = require("../helpers/props");

const fromMerchantPaymentDetailsDTO = mapProps({
	expiryTime: toDate
});

const fromMerchantPaymentSummaryDTO = mapProps({
	expiryTime: toDate
});

const fromMerchantPaymentSummariesDTO = mapProps({
	payments: map(fromMerchantPaymentSummaryDTO)
});

module.exports = {
	fromMerchantPaymentDetailsDTO,
	fromMerchantPaymentSummariesDTO,
	fromMerchantPaymentSummaryDTO
};
