const { Wallet } = require("../../../src/model");

exports.aWalletDeleteRequest = () => ({
	wallet: Wallet.MERCHANT,
	uid: "61ea4c7310df484d91e15cd6ad883ccb",
	shopperId: "12345"
});
