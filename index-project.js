"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");

/*
 * Generates index files for project to save one from reexporting hell.
 */

scanDir(path.join(__dirname, "src"));

async function scanDir(dir) {
	const contents = await fs.promises.readdir(dir);
	const dirs = contents.filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
	const ts = contents
		.filter((file) => file.match(/\.ts$/))

		// ignore index files.
		.filter((file) => !file.match("index.ts"))
		.sort();

	const index = fs.createWriteStream(path.join(dir, "index.ts"), { encoding: "utf8" });

	if (dirs.length > 0) {
		for (const d of dirs) {
			await scanDir(path.join(dir, d));

			await writeTo(index, `export * from "./${d}/index";\n`);
		}

		await writeTo(index, "\n");
	}

	for (const file of ts) {
		await writeTo(index, `export * from "./${path.basename(file, ".ts")}";\n`);
	}

	await util.promisify(index.close).call(index);
}

function writeTo(stream, str) {
	return new Promise((resolve) => {
		if (!stream.write(str, "utf8")) {
			stream.once('drain', resolve);
		}
		else {
			resolve();
		}
	});
}
