# project-harness-bootstrap

Bootstrap a repo-local AI project harness with one sentence.

This repository packages three things together:

1. A Codex skill entrypoint
2. A base harness template plus specialized template overlays
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

## Template Strategy

The repository now uses a layered template model:

- `templates/base/`: stack-agnostic harness
- `templates/frontend-only/`: overlay for pure frontend projects
- `templates/frontend-fastapi/`: overlay for frontend + FastAPI projects

Bootstrap logic always copies `base` first, then applies a specialized overlay when one is selected.

## Default Behavior

This repo is still stack-agnostic by default.

- If the user intent clearly says pure frontend, it selects `frontend-only`
- If the user intent clearly says FastAPI or Python backend, it selects `frontend-fastapi`
- If the stack is unclear, it falls back to `base`
- The user should not need to remember a template flag in normal conversations

## Quick Start

### 1. Use the skill

If installed in Codex skills:

```text
使用 $project-harness-bootstrap 在 E:\workspace\Projects\my-app 初始化一个新项目：
项目名是 My App，目标是做一个前端加 FastAPI 的 AI 工具，
第一版先完成上传、处理和结果展示。
```

### 2. Or run the script directly

```powershell
node scripts/init-ai-harness.mjs `
  --project-root "E:\workspace\Projects\my-app" `
  --project-name "My App" `
  --goal "做一个前端加 FastAPI 的 AI 工具" `
  --scope "第一版先完成上传、处理和结果展示" `
  --stack "React + FastAPI"
```

Manual override remains available when needed:

```powershell
node scripts/init-ai-harness.mjs `
  --project-root "E:\workspace\Projects\my-app" `
  --project-name "My App" `
  --goal "做一个纯前端官网" `
  --scope "第一版完成首页和表单" `
  --template "frontend-only"
```

## Repository Layout

- `SKILL.md`: thin skill entrypoint
- `agents/openai.yaml`: UI metadata for the skill
- `docs/`: methodology and design docs
- `templates/base/`: shared harness files
- `templates/frontend-only/`: frontend-only overlay
- `templates/frontend-fastapi/`: frontend-fastapi overlay
- `scripts/init-ai-harness.mjs`: bootstrap script
- `scripts/test-init-ai-harness.mjs`: smoke test

## FastAPI Template Notes

The `frontend-fastapi` template includes:

- frontend placeholder directory
- backend FastAPI scaffold
- Python environment bootstrap script
- request and startup logging
- minimal comments at key boundaries

Python environment preference:

1. `conda`
2. `uv`
3. fallback to documenting `待确认`

## Verification

Run:

```powershell
node scripts/test-init-ai-harness.mjs
```
