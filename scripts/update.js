"use strict";

const fs = require("fs");
const { spawn } = require("child_process");
const chalk = require("chalk");
const core = require("@actions/core");
const { getVersions } = require("./util");

/**
 * Update to latest patch
 * @param {Versions} versions
 */
async function update(versions) {
  const { latest, previous } = versions;
  const golol = spawn("bin/golor", [latest, previous]);

  golol.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  golol.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  golol.on("close", (code) => {
    console.log(`golol exited with code ${code}`);

    if (code === 0) {
      core.setOutput("patch", latest);
      core.setOutput("should-commit", true);
    }
  });
}

(async () => {
  try {
    const versions = await getVersions();
    const { latest } = versions;
    const versionFile = "public/data/version.txt";
    const force = process.argv[2] === "--force";

    if (!fs.existsSync(versionFile) || force) {
      return await update(versions);
    }

    const currentVersion = fs.readFileSync(versionFile).toString();

    if (latest !== currentVersion) {
      return await update(versions);
    }

    core.setOutput("should-commit", false);
    console.log(
      chalk.yellow(
        `Patch ${latest} it's already downloaded. Use the flag --force for download the latest patch anyway`
      )
    );
  } catch (error) {
    console.error(error);
  }
})();
