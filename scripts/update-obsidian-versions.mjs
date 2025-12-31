import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.argv[2];

if (!targetVersion) {
  console.error("Error: Version argument required");
  process.exit(1);
}

console.log(`Updating Obsidian files to version ${targetVersion}`);

// Update manifest.json
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));
console.log(`✓ manifest.json → ${targetVersion}`);

// Update versions.json
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
console.log(`✓ versions.json → ${targetVersion}: ${minAppVersion}`);
