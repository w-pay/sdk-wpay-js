"use strict";

const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");

const { fromBasketDTO } = require("./basket");
const { fromDynamicPayloadDTO } = require("./dynamic-payload");
const { toDate } = require("../helpers/props");

const fromMerchantPaymentDetailsDTO =
	mapProps({
		expiryTime: toDate,
		basket: fromBasketDTO,
		posPayload: fromDynamicPayloadDTO,
		merchantPayload: fromDynamicPayloadDTO
	})

const fromMerchantPaymentSummaryDTO =
	mapProps({
		expiryTime: toDate
	})

const fromMerchantPaymentSummariesDTO =
	mapProps({
		payments: map(fromMerchantPaymentSummaryDTO)
	})

module.exports = {
	fromMerchantPaymentDetailsDTO,
	fromMerchantPaymentSummariesDTO,
	fromMerchantPaymentSummaryDTO
}
