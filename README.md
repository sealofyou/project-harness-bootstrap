# project-harness-bootstrap

Bootstrap a repo-local AI project harness with one sentence.

This repository packages three things together:

1. A Codex skill entrypoint
2. A repo template for project-local `AGENTS.md`, specs, runbooks, and iteration docs
3. A bootstrap script that writes the harness into a new project directory

## What This Is For

Use this when you want a new project to start with a stable AI execution contract instead of relying on ad-hoc chat history.

The harness is designed so later work can follow a consistent loop:

1. initialize
2. decompose
3. implement
4. test
5. verify
6. document
7. continue unless a human gate is hit

## What Gets Generated

The bootstrap writes a minimal project structure like this:

```text
AGENTS.md
docs/specs/
docs/runbooks/
docs/iterations/
docs/reviews/
```

## Default Behavior

This version is stack-agnostic by default.

- If you specify a tech stack, it writes that stack into the generated docs.
- If you do not specify a tech stack, it writes `待确认`.
- It does not yet scaffold framework-specific runtime code.
- It is meant to initialize the operating contract first, then let later implementation follow that contract.

So these are all valid:

- pure frontend
- frontend + FastAPI
- AI product with Python backend
- generic web app with stack undecided

## Quick Start

### 1. Use the skill

If installed in Codex skills:

```text
使用 $project-harness-bootstrap 在 E:\workspace\Projects\my-app 初始化一个新项目：
项目名是 My App，目标是做一个给内容创作者使用的 AI 工作台，
第一版先完成登录、项目创建、内容生成与基础发布，技术栈优先 Next.js + Supabase。
```

### 2. Or run the script directly

```powershell
node scripts/init-ai-harness.mjs `
  --project-root "E:\workspace\Projects\my-app" `
  --project-name "My App" `
  --goal "做一个给内容创作者使用的 AI 工作台" `
  --scope "第一版先完成登录、项目创建、内容生成与基础发布" `
  --target-user "内容创作者" `
  --stack "Next.js + Supabase" `
  --deploy-target "待确认"
```

## Repository Layout

- `SKILL.md`: thin skill entrypoint
- `agents/openai.yaml`: UI metadata for the skill
- `docs/`: methodology and usage docs
- `templates/project-harness-repo/`: generated project template
- `scripts/init-ai-harness.mjs`: bootstrap script
- `scripts/test-init-ai-harness.mjs`: smoke test

## Verification

Run:

```powershell
node scripts/test-init-ai-harness.mjs
```

## Current Limitation

This repo initializes the harness and project operating contract.

It does not yet generate framework-specific app code for stacks like:

- pure frontend SPA
- Next.js fullstack
- FastAPI backend
- Next.js + FastAPI split architecture

That can be added later as specialized templates layered on top of this base harness.
