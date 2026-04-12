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

async function run() {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-harness-'));
  const projectRoot = path.join(tempRoot, 'demo-project');
  const scriptPath = path.resolve(__dirname, 'init-ai-harness.mjs');

  await execFileAsync('node', [
    scriptPath,
    '--project-root',
    projectRoot,
    '--project-name',
    'Demo Project',
    '--goal',
    '做一个可自动推进的测试项目',
    '--target-user',
    '内部团队',
    '--stack',
    'Next.js',
    '--scope',
    '完成登录与项目创建最小闭环',
    '--deploy-target',
    'Vercel',
  ]);

  const agents = await fs.readFile(path.join(projectRoot, 'AGENTS.md'), 'utf8');
  const brief = await fs.readFile(path.join(projectRoot, 'docs/specs/01-项目启动卡.md'), 'utf8');
  const testing = await fs.readFile(path.join(projectRoot, 'docs/specs/05-测试与验证策略.md'), 'utf8');

  assert.match(agents, /Demo Project/);
  assert.match(brief, /做一个可自动推进的测试项目/);
  assert.match(brief, /完成登录与项目创建最小闭环/);
  assert.match(testing, /发布前最小验证集合/);

  await fs.rm(tempRoot, { recursive: true, force: true });
  console.log('init-ai-harness 测试通过');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
