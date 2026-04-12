import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith('--')) continue;
    const key = current.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = 'true';
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function ensureNoConflicts(files, fromRoot, toRoot, force) {
  if (force) return;
  for (const file of files) {
    const relativePath = path.relative(fromRoot, file);
    const targetPath = path.join(toRoot, relativePath);
    try {
      await fs.access(targetPath);
      throw new Error(`目标文件已存在：${targetPath}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const projectRoot = args['project-root'];

  if (!projectRoot) {
    throw new Error('缺少必填参数 --project-root');
  }

  const replacements = {
    '__PROJECT_NAME__': args['project-name'] ?? path.basename(projectRoot),
    '__PROJECT_ROOT__': projectRoot,
    '__PROJECT_GOAL__': args.goal ?? '待补充项目目标',
    '__TARGET_USER__': args['target-user'] ?? '待确认',
    '__DELIVERABLE_TYPE__': args['deliverable-type'] ?? 'Web / App / AI 产品（待确认）',
    '__TECH_STACK__': args.stack ?? '待确认',
    '__DEPLOY_TARGET__': args['deploy-target'] ?? '待确认',
    '__INITIAL_SCOPE__': args.scope ?? '待补充本版 MVP 范围',
  };

  const templateRoot = path.resolve(__dirname, '../templates/project-harness-repo');
  const files = await walk(templateRoot);
  const force = args.force === 'true';

  await fs.mkdir(projectRoot, { recursive: true });
  await ensureNoConflicts(files, templateRoot, projectRoot, force);

  for (const sourceFile of files) {
    const relativePath = path.relative(templateRoot, sourceFile);
    const targetFile = path.join(projectRoot, relativePath);
    await fs.mkdir(path.dirname(targetFile), { recursive: true });

    let content = await fs.readFile(sourceFile, 'utf8');
    for (const [token, value] of Object.entries(replacements)) {
      content = content.replaceAll(token, value);
    }

    await fs.writeFile(targetFile, content, 'utf8');
  }

  console.log(`AI Harness 已初始化：${projectRoot}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
