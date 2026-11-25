// Write one nostalgic childhood-memory line to /output/entry.txt.
//
// Deterministic, no network, no dependencies. The line is a fixed string:
// the program writes exactly these bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "When the power went out on stormy nights, my father lit one candle and told stories until I fell asleep on his lap, and I have never slept that soundly since.";

// Gate mirror: the house gate accepts 1-280 characters of non-whitespace
// text; the task brief caps it at 199. Fail loudly here rather than write a
// line the gate would refuse.
if (LINE.length < 1 || LINE.length > 199 || !LINE.trim()) {
  throw new Error(`entry line is ${LINE.length} chars, outside the 1-199 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the line: a silent short
// write or encoding slip must fail the run, never reach the judge.
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("entry.txt read-back does not match the line");
}
