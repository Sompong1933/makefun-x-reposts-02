import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Entry for make.fun's "Get the most reposts and likes on make.fun's newest
// X posts" bounty: the entry is the list of X posts in POSTS.json, each one a
// quote of, or a direct reply to, a different one of @makefunai's newest
// posts. This program copies that list to /output for the judges to read.
const root = dirname(fileURLToPath(import.meta.url));
const posts = JSON.parse(readFileSync(join(root, "POSTS.json"), "utf8"));

// Every entry must be a public X post URL from one account, in the form
// https://x.com/<handle>/status/<id>. Anything else fails loudly instead of
// silently reaching the judges with a bad list.
const urlPattern = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+$/;
const bad = posts.posts.filter((u) => typeof u !== "string" || !urlPattern.test(u));
if (bad.length > 0) {
  console.error(`Invalid post URLs in POSTS.json: ${bad.join(", ")}`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync(join("/output", "POSTS.json"), JSON.stringify(posts, null, 2));
for (const u of posts.posts) console.log(` - ${u}`);
console.log(`Copied ${posts.posts.length} post URLs to /output/POSTS.json`);
