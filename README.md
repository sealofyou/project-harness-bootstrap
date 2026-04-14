# project-harness-bootstrap

Bootstrap a repo-local AI project harness with one sentence.

This repository is for organizing how a new project gets started, not for forcing every future project into a fixed technical stack.

## What It Does

It packages three things together:

1. A Codex skill entrypoint
2. A base harness template plus a small set of optional project-shape overlays
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

## What This Is Not

This is not a hard-coded framework generator.

It should not silently decide that all frontend projects must use `React`, `Vue`, `Next.js`, plain HTML/CSS/JS, or any other specific stack unless the user has already made that choice clear in the current project request.

Its main job is to:

- organize the project brief
- create the system-of-record docs
- establish testing, verification, and writeback rules
- preserve room for stack decisions to be made per project

## Template Strategy

The repository uses a layered model:

- `templates/base/`: stack-agnostic harness
- `templates/frontend-only/`: optional overlay for pure frontend project shape
- `templates/frontend-fastapi/`: optional overlay for frontend + FastAPI project shape

Bootstrap logic always copies `base` first.

An overlay is only an organizing aid. It is not a promise that future work is locked to one framework forever.

## Default Behavior

This repo is stack-agnostic by default.

- If the stack is unclear, it stays generic and records `待确认`
- If the user has already made the project shape clear, an overlay can be used to organize that shape
- Framework and library choices should still follow the current project request, not a repo-level default
- The user should not need to remember a template flag in normal conversations

## Quick Start

### 1. Use the skill

If installed in Codex skills:

```text
使用 $project-harness-bootstrap 在 E:\workspace\Projects\my-app 初始化一个新项目：
项目名是 My App，目标是做一个 AI 工具，
第一版先完成上传、处理和结果展示。
```

### 2. Or run the script directly

```powershell
node scripts/init-ai-harness.mjs `
  --project-root "E:\workspace\Projects\my-app" `
  --project-name "My App" `
  --goal "做一个 AI 工具" `
  --scope "第一版先完成上传、处理和结果展示"
```

Manual override remains available when it actually helps:

```powershell
node scripts/init-ai-harness.mjs `
  --project-root "E:\workspace\Projects\my-app" `
  --project-name "My App" `
  --goal "做一个前端加 FastAPI 的项目" `
  --scope "第一版先完成上传、处理和结果展示" `
  --template "frontend-fastapi"
```

## Repository Layout

- `SKILL.md`: thin skill entrypoint
- `agents/openai.yaml`: UI metadata for the skill
- `docs/`: methodology and design docs
- `templates/base/`: shared harness files
- `templates/frontend-only/`: optional project-shape overlay
- `templates/frontend-fastapi/`: optional project-shape overlay
- `scripts/init-ai-harness.mjs`: bootstrap script
- `scripts/test-init-ai-harness.mjs`: smoke test

## Current Overlay Notes

The `frontend-fastapi` overlay includes:

- a frontend placeholder
- a FastAPI-oriented backend scaffold
- Python environment bootstrap guidance
- request and startup logging
- minimal comments at key boundaries

This is a helper for that project shape, not a universal default for all future projects.

## Verification

Run:

```powershell
node scripts/test-init-ai-harness.mjs
```
