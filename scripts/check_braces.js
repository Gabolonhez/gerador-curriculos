const fs = require("fs");
const path = require("path");
const file = path.resolve(__dirname, "../src/styles/ats-resume.css");
const text = fs.readFileSync(file, "utf8");
const lines = text.split(/\r?\n/);
let balance = 0;
let problems = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let ch of line) {
    if (ch === "{") balance++;
    if (ch === "}") balance--;
  }
  if (balance < 0) {
    problems.push({ line: i + 1, reason: "unexpected_closing", balance });
    balance = 0; // continue scanning
  }
}
let totalOpen = (text.match(/{/g) || []).length;
let totalClose = (text.match(/}/g) || []).length;
console.log(
  "Total { =",
  totalOpen,
  "Total } =",
  totalClose,
  "Final balance =",
  balance
);
if (problems.length) {
  console.log("Found unexpected closing braces at lines:");
  problems.forEach((p) => console.log("  line", p.line, "balance", p.balance));
} else if (totalOpen !== totalClose) {
  console.log("Brace mismatch: opens != closes");
} else {
  console.log("Braces appear balanced (but parser may still fail).");
}
// Print a small window around first problem if any
if (problems.length) {
  const l = problems[0].line;
  const start = Math.max(0, l - 5);
  const end = Math.min(lines.length, l + 5);
  console.log("Context around first problem:");
  for (let j = start; j < end; j++) {
    console.log((j + 1).toString().padStart(4), "|", lines[j]);
  }
}
