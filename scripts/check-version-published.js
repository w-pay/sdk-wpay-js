"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

/*
 * Searches NPM for the @wpay/sdk module at a given version
 *
 * Exit codes
 *  - 0 - Module not found at version
 *  - 1 - Module found at version
 *  - 2 - No version supplied
 */

if (process.argv.length < 3) {
	console.error(`Usage: ${path.relative(process.cwd(), process.argv[1])} <version>`);
	process.exit(2);
}

const packageData = fetchPackageData();
const version = process.argv[2];

console.log(`Searching for ${version}`);
const found = packageData.versions.find((v) => v === version);

process.exit(checkResult(found, version));

function fetchPackageData() {
	const data = spawnSync("npm", [ "view", "@wpay/sdk", "--json" ], { encoding: "utf8" }).stdout;

	return JSON.parse(data);
}

function checkResult(result, version) {
	if (result !== undefined) {
		console.log(`Found ${version}`);

		return 1;
	}
	else {
		console.log(`Didn't find ${version}`);

		return  0;
	}
}
