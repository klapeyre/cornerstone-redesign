import { mkdir, writeFile, stat, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const srcRoot = join(repoRoot, ".gallery-src");

const CONCURRENCY = 6;
const MAX_RETRIES = 3;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const manifest = JSON.parse(
  await readFile(join(scriptDir, "gallery-manifest.json"), "utf8"),
);

const encodePath = (folder, file) =>
  `${manifest.baseUrl}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function alreadyDownloaded(path) {
  try {
    return (await stat(path)).size > 0;
  } catch {
    return false;
  }
}

async function download(url, destPath) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length === 0) throw new Error("empty response");
      await writeFile(destPath, bytes);
      return { status: "downloaded", bytes: bytes.length };
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        return { status: "failed", error: String(err.message || err) };
      }
      await sleep(500 * 2 ** (attempt - 1));
    }
  }
}

async function runPool(tasks, worker, size) {
  const queue = [...tasks];
  const runners = Array.from({ length: size }, async () => {
    while (queue.length) await worker(queue.shift());
  });
  await Promise.all(runners);
}

const report = [];
let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const project of manifest.projects) {
  const outDir = join(srcRoot, project.slug);
  await mkdir(outDir, { recursive: true });

  let pDownloaded = 0;
  let pSkipped = 0;
  let pFailed = 0;

  await runPool(
    project.files,
    async (file) => {
      const destPath = join(outDir, file);
      const url = encodePath(project.folder, file);

      if (await alreadyDownloaded(destPath)) {
        pSkipped++;
        report.push({ slug: project.slug, file, url, status: "skipped" });
        return;
      }

      const result = await download(url, destPath);
      report.push({ slug: project.slug, file, url, ...result });
      if (result.status === "downloaded") pDownloaded++;
      else pFailed++;
    },
    CONCURRENCY,
  );

  downloaded += pDownloaded;
  skipped += pSkipped;
  failed += pFailed;

  const flag = pFailed ? " — FAILURES" : "";
  console.log(
    `${project.slug.padEnd(28)} ${pDownloaded} downloaded, ${pSkipped} skipped, ${pFailed} failed${flag}`,
  );
}

await writeFile(
  join(srcRoot, "_fetch-report.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2),
);

const total = downloaded + skipped + failed;
console.log(
  `\n${total} files: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`,
);

if (failed) {
  console.error(
    "\nSome downloads failed — see .gallery-src/_fetch-report.json, then re-run to retry.",
  );
  process.exit(1);
}
