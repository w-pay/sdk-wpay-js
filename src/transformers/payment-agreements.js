"use strict";

const mapProps = require("crocks/helpers/mapProps");
const map = require("crocks/pointfree/map");
const { toDate, toUpperCase, toURL } = require("../helpers/props");

const fromPaymentAgreementDTO = mapProps({
	lastUpdated: toDate,
	lastUsed: toDate,
	createdOn: toDate,
	startDate: toDate,
	endDate: toDate,
	status: toUpperCase,
	type: toUpperCase,
	chargeFrequency: toUpperCase,
	updateURL: toURL
});

const fromPaymentAgreementsDTO = mapProps({
	paymentAgreements: map(fromPaymentAgreementDTO)
});

module.exports = {
	fromPaymentAgreementDTO,
	fromPaymentAgreementsDTO
};
