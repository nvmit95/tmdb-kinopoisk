import fs from "node:fs"
import path from "node:path"

const projectRoot = path.resolve(process.cwd())
const srcRoot = path.join(projectRoot, "src")

const exts = [".ts", ".tsx", ".js", ".jsx"]
const ignored = [
  /\\dist\\/,
  /\\node_modules\\/,
  /\\\.git\\/,
  /\\\.vite\\/,
  /\\\.pnpm\\/,
]

function walk(dir) {
  const out = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ignored.some((re) => re.test(p))) continue
    if (ent.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

function isCodeFile(p) {
  if (!exts.includes(path.extname(p))) return false
  if (p.endsWith(".d.ts")) return false
  return true
}

function readTextSafe(p) {
  try {
    return fs.readFileSync(p, "utf8")
  } catch {
    return null
  }
}

function resolveImport(fromFile, spec) {
  // Ignore non-file imports.
  if (!spec.startsWith(".") && !spec.startsWith("@/")) return null

  const fromDir = path.dirname(fromFile)
  let base =
    spec.startsWith("@/") ? path.join(srcRoot, spec.slice(2)) : path.resolve(fromDir, spec)

  // Try exact file first.
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base

  // Try extensions.
  for (const ext of exts) {
    const cand = base + ext
    if (fs.existsSync(cand)) return cand
  }

  // Try directory index.
  if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
    for (const ext of exts) {
      const cand = path.join(base, "index" + ext)
      if (fs.existsSync(cand)) return cand
    }
  }

  return null
}

const importRe =
  /(?:import|export)\s+(?:type\s+)?(?:[^'"]+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g

function getDeps(file) {
  const txt = readTextSafe(file)
  if (!txt) return []
  const deps = []
  let m
  while ((m = importRe.exec(txt))) {
    const spec = m[1] ?? m[2]
    if (!spec) continue
    const resolved = resolveImport(file, spec)
    if (resolved) deps.push(resolved)
  }
  return deps
}

const allSrcFiles = walk(srcRoot).filter(isCodeFile)
const entry = path.join(srcRoot, "main.tsx")

const reachable = new Set()
const queue = [entry]

while (queue.length) {
  const f = queue.pop()
  if (!f || reachable.has(f)) continue
  reachable.add(f)
  for (const dep of getDeps(f)) {
    if (!reachable.has(dep)) queue.push(dep)
  }
}

const orphans = allSrcFiles
  .filter((f) => !reachable.has(f))
  .map((f) => path.relative(projectRoot, f))
  .sort((a, b) => a.localeCompare(b))

process.stdout.write(
  orphans.length
    ? `Orphans (${orphans.length}):\n` + orphans.map((x) => `- ${x}`).join("\n") + "\n"
    : "No orphans found.\n",
)

