"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

if (process.argv.length < 3) {
	console.error(`Usage: ${path.relative(process.cwd(), process.argv[1])} <version>`);
	process.exit(1);
}

const packageData = fetchPackageData();
const version = process.argv[2];

console.log(`Searching for ${version}`);
const found = packageData.versions.find((v) => v === version);
const result = checkResult(found);

process.exit(result);

function fetchPackageData() {
	const data = spawnSync("npm", [ "view", "@wpay/sdk", "--json" ], { encoding: "utf8" }).stdout;

	return JSON.parse(data);
}

function checkResult(result) {
	if (result !== undefined) {
		return 1;
	}
	else {
		return  0;
	}
}
