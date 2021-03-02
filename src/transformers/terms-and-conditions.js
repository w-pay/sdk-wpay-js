"use strict";

const map = require("crocks/pointfree/map");
const mapProps = require("crocks/helpers/mapProps");
const { objectToMap } = require("./object");

const fromTermsAndConditionsAcceptanceDTO = objectToMap;

const fromTermsAndConditionsAcceptancesDTO = mapProps({
	termsAndConditionsAcceptances: map(fromTermsAndConditionsAcceptanceDTO)
});

module.exports = {
	fromTermsAndConditionsAcceptancesDTO
};
