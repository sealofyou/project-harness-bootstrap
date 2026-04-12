---
name: project-harness-bootstrap
description: Use when starting a brand-new software, website, or AI product project and wanting one sentence to initialize a repo-local harness with AGENTS.md, specs, testing strategy, deployment runbooks, iteration docs, and writeback structure before implementation begins.
---

# Project Harness Bootstrap

## Overview

Use this skill to bootstrap a new project before implementation starts.

The goal is not to begin coding immediately. The goal is to first create the repo-local harness that future single-agent or multi-agent execution will follow.

## Canonical Sources

Treat these repository files as canonical:

- `docs/AI项目-Harness-总设计-v1.md`
- `docs/AI项目-Harness-仓库模板规范-v1.md`
- `docs/AI项目-Harness-一句话启动说明-v1.md`
- `templates/project-harness-repo/`
- `scripts/init-ai-harness.mjs`

If generated files and these bundled docs disagree, update generated files to match the bundled docs.

## Required Inputs

Try to extract these from the user's message first:

1. Project root
2. Project name
3. Project goal
4. First-version scope

Optional:

1. Target user
2. Tech stack
3. Deploy target
4. Deliverable type

If some inputs are missing, do not block bootstrap. Use low-risk defaults and write `待确认` into generated docs.

## Bootstrap Workflow

1. Confirm the target project path.
2. Read the bundled docs listed above.
3. Run:

```powershell
node "<SKILL_DIR>\scripts\init-ai-harness.mjs" --project-root "<PROJECT_ROOT>" --project-name "<PROJECT_NAME>" --goal "<PROJECT_GOAL>" --scope "<FIRST_VERSION_SCOPE>" --target-user "<TARGET_USER>" --stack "<TECH_STACK>" --deploy-target "<DEPLOY_TARGET>" --deliverable-type "<DELIVERABLE_TYPE>"
```

Resolve `<SKILL_DIR>` as the directory containing this `SKILL.md`.

4. Read the generated `AGENTS.md` and `docs/specs/` files.
5. Backfill any additional information already present in the user request.
6. Tell the user:
   - what was created
   - which assumptions were used
   - what the next implementation step is
7. For all later implementation in that repo, follow the generated `AGENTS.md` and spec files as the project system of record.

## Default Assumptions

Use these defaults unless the user gave better constraints:

- Deliverable type: `Web / App / AI 产品（待确认）`
- Target user: `待确认`
- Tech stack: `待确认`
- Deploy target: `待确认`

## Guardrails

- Do not start implementation before the harness exists unless the user explicitly says to skip initialization.
- Do not ask step-by-step permission for routine scaffolding.
- Do not leave missing fields blank when `待确认` is more informative.
- Do not treat chat history as the long-term system of record once files exist.

## Handoff Rule

After bootstrap completes, future work in that repo should begin by reading:

1. `AGENTS.md`
2. `docs/specs/01-项目启动卡.md`
3. `docs/specs/02-MVP范围与非目标.md`
4. `docs/specs/03-验收标准.md`
5. `docs/specs/04-人工闸门.md`
6. `docs/specs/05-测试与验证策略.md`

## Example Invocation

```text
使用 $project-harness-bootstrap 在 E:\workspace\Projects\my-app 初始化一个新项目：
项目名是 My App，目标是做一个给内容创作者使用的 AI 工作台，
第一版先完成登录、项目创建、内容生成与基础发布，技术栈优先 Next.js + Supabase。
```
