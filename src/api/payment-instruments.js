"use strict";

const list = (client, wallet) => Promise.resolve();

const deleteInstrument = (client) => () => Promise.resolve();

const initiateAddition = (client, instrument) => Promise.resolve();

module.exports = (client) => {
	/** @implements {import('../../types/api/Administration').AdministrationApi} */
	return {
		list: list(client),
		delete: deleteInstrument(client),
		initiateAddition: initiateAddition(client)
	};
}
