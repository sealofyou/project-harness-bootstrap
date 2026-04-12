import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AVAILABLE_TEMPLATES = new Set(['base', 'frontend-only', 'frontend-fastapi']);

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith('--')) continue;

    const key = current.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith('--')) {
      args[key] = 'true';
      continue;
    }

    args[key] = next;
    index += 1;
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
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

function inferTemplate(args) {
  if (args.template) {
    if (!AVAILABLE_TEMPLATES.has(args.template)) {
      throw new Error(`不支持的模板：${args.template}`);
    }
    return args.template;
  }

  const intentText = [
    args.goal,
    args.scope,
    args.stack,
    args['deliverable-type'],
    args.intent,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const fastApiSignals = [
    'fastapi',
    'fast api',
    'python 后端',
    'python backend',
    '前端加后端',
    '前后端',
    'api 后端',
    'backend api',
  ];

  if (fastApiSignals.some((signal) => intentText.includes(signal))) {
    return 'frontend-fastapi';
  }

  const frontendOnlySignals = [
    '纯前端',
    'frontend only',
    '前端官网',
    'landing page',
    '落地页',
    '静态站点',
    '前端页面',
    '展示站点',
  ];

  if (frontendOnlySignals.some((signal) => intentText.includes(signal))) {
    return 'frontend-only';
  }

  return 'base';
}

function buildReplacementMap(args, projectRoot, selectedTemplate) {
  return {
    '__PROJECT_NAME__': args['project-name'] ?? path.basename(projectRoot),
    '__PROJECT_ROOT__': projectRoot,
    '__PROJECT_GOAL__': args.goal ?? '待补充项目目标',
    '__TARGET_USER__': args['target-user'] ?? '待确认',
    '__DELIVERABLE_TYPE__': args['deliverable-type'] ?? 'Web / App / AI 产品（待确认）',
    '__TECH_STACK__': args.stack ?? '待确认',
    '__DEPLOY_TARGET__': args['deploy-target'] ?? '待确认',
    '__INITIAL_SCOPE__': args.scope ?? '待补充本版 MVP 范围',
    '__SELECTED_TEMPLATE__': selectedTemplate,
  };
}

async function collectFinalFiles(templateNames) {
  const finalFiles = new Map();

  for (const templateName of templateNames) {
    const templateRoot = path.resolve(__dirname, '../templates', templateName);
    const files = await walk(templateRoot);
    for (const sourceFile of files) {
      const relativePath = path.relative(templateRoot, sourceFile);
      finalFiles.set(relativePath, sourceFile);
    }
  }

  return finalFiles;
}

async function ensureNoTargetConflicts(relativePaths, projectRoot, force) {
  if (force) return;

  for (const relativePath of relativePaths) {
    const targetPath = path.join(projectRoot, relativePath);
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

  const selectedTemplate = inferTemplate(args);
  const templateChain = ['base'];
  if (selectedTemplate !== 'base') {
    templateChain.push(selectedTemplate);
  }

  const replacements = buildReplacementMap(args, projectRoot, selectedTemplate);
  const finalFiles = await collectFinalFiles(templateChain);
  const force = args.force === 'true';

  await fs.mkdir(projectRoot, { recursive: true });
  await ensureNoTargetConflicts([...finalFiles.keys()], projectRoot, force);

  for (const [relativePath, sourceFile] of finalFiles.entries()) {
    const targetFile = path.join(projectRoot, relativePath);
    await fs.mkdir(path.dirname(targetFile), { recursive: true });

    let content = await fs.readFile(sourceFile, 'utf8');
    for (const [token, value] of Object.entries(replacements)) {
      content = content.replaceAll(token, value);
    }

    await fs.writeFile(targetFile, content, 'utf8');
  }

  console.log(`AI Harness 已初始化：${projectRoot}`);
  console.log(`使用模板：${selectedTemplate}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
