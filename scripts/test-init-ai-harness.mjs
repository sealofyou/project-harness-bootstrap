import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fileExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function runBootstrap(args) {
  const scriptPath = path.resolve(__dirname, 'init-ai-harness.mjs');
  await execFileAsync('node', [scriptPath, ...args]);
}

async function readUtf8(file) {
  return fs.readFile(file, 'utf8');
}

async function testBaseTemplate(tempRoot) {
  const projectRoot = path.join(tempRoot, 'base-project');

  await runBootstrap([
    '--project-root',
    projectRoot,
    '--project-name',
    'Base Project',
    '--goal',
    '做一个通用项目',
    '--scope',
    '完成最小闭环',
  ]);

  assert.equal(await fileExists(path.join(projectRoot, 'AGENTS.md')), true);
  assert.equal(await fileExists(path.join(projectRoot, 'frontend')), false);
  assert.equal(await fileExists(path.join(projectRoot, 'backend')), false);
}

async function testFrontendOnlyTemplate(tempRoot) {
  const projectRoot = path.join(tempRoot, 'frontend-only-project');

  await runBootstrap([
    '--project-root',
    projectRoot,
    '--project-name',
    'Frontend Only',
    '--goal',
    '做一个纯前端官网',
    '--scope',
    '完成首页与联系表单',
    '--template',
    'frontend-only',
  ]);

  assert.equal(await fileExists(path.join(projectRoot, 'frontend', 'README.md')), true);
  assert.equal(await fileExists(path.join(projectRoot, 'backend')), false);

  const readme = await readUtf8(path.join(projectRoot, 'frontend', 'README.md'));
  assert.match(readme, /纯前端模板/);
}

async function testFrontendFastApiTemplate(tempRoot) {
  const projectRoot = path.join(tempRoot, 'frontend-fastapi-project');

  await runBootstrap([
    '--project-root',
    projectRoot,
    '--project-name',
    'Frontend FastAPI',
    '--goal',
    '做一个前端加 FastAPI 的项目',
    '--scope',
    '完成前后端最小闭环',
    '--template',
    'frontend-fastapi',
  ]);

  assert.equal(await fileExists(path.join(projectRoot, 'frontend', 'README.md')), true);
  assert.equal(await fileExists(path.join(projectRoot, 'backend', 'app', 'main.py')), true);
  assert.equal(await fileExists(path.join(projectRoot, 'backend', 'app', 'core', 'logging.py')), true);

  const mainPy = await readUtf8(path.join(projectRoot, 'backend', 'app', 'main.py'));
  assert.match(mainPy, /FastAPI/);
  assert.match(mainPy, /logger/);
}

async function testAutomaticTemplateInference(tempRoot) {
  const projectRoot = path.join(tempRoot, 'auto-fastapi-project');

  await runBootstrap([
    '--project-root',
    projectRoot,
    '--project-name',
    'Auto FastAPI',
    '--goal',
    '做一个 AI 工具，前端加 Python FastAPI 后端',
    '--scope',
    '完成上传与处理接口',
    '--stack',
    'React + FastAPI',
  ]);

  assert.equal(await fileExists(path.join(projectRoot, 'backend', 'app', 'main.py')), true);
  assert.equal(await fileExists(path.join(projectRoot, 'frontend', 'README.md')), true);
}

async function run() {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-harness-'));

  try {
    await testBaseTemplate(tempRoot);
    await testFrontendOnlyTemplate(tempRoot);
    await testFrontendFastApiTemplate(tempRoot);
    await testAutomaticTemplateInference(tempRoot);
    console.log('init-ai-harness 测试通过');
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
