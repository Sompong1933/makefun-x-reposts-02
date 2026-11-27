import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Entry for make.fun's "Get the most reposts and likes on make.fun's newest
// X posts" bounty: the entry is the list of X posts in POSTS.json, each one a
// quote of, or a direct reply to, a different one of @makefunai's newest
// posts. This program copies that list to /output for the judges to read.
const root = dirname(fileURLToPath(import.meta.url));
const posts = JSON.parse(readFileSync(join(root, "POSTS.json"), "utf8"));

mkdirSync("/output", { recursive: true });
writeFileSync(join("/output", "POSTS.json"), JSON.stringify(posts, null, 2));
console.log(`Copied ${posts.posts.length} post URLs to /output/POSTS.json`);
