"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

if (process.argv.length < 3) {
	console.error(`Usage: ${path.relative(process.cwd(), process.argv[1])} <version>`);
	process.exit(1);
}

const packageData = fetchPackageData();
const version = packageData.versions.find((v) => v === process.argv[2]);

const result = version ? 1 : 0;
process.exit(result);

function fetchPackageData() {
	const data = spawnSync("npm", [ "view", "@wpay/sdk", "--json" ], { encoding: "utf8" }).stdout;

	return JSON.parse(data);
}
