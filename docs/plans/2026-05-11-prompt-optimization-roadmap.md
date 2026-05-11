# Prompt Optimization Roadmap

Date: 2026-05-11

## One-line direction

The next phase is not to add more broad prompts. It is to make each prompt narrower, more enforceable, and easier to hand to a future sub-agent.

Priority order:

1. Product / PRD
2. Git
3. Frontend
4. Backend
5. Test
6. Collaboration / remote repo / Linear / multi-agent

## Why this order

Frontend and Git feel most urgent because they affect daily development quality immediately. However, frontend quality depends on knowing what product path and user expectation it is serving. So the first real optimization should be a compact Product / PRD pass, not a huge product system.

After that, Git should be hardened early because every later prompt improvement will produce code and docs changes. If Git rules are weak, future iterations become hard to review and sync across computers.

Frontend should come immediately after Product and Git, because it is where the user's quality bar is most visible: product shape, design intent, implementation detail, and visual QA all meet there.

## Phase 1: Product / PRD prompt

Goal: make project startup reliably ask the right questions and produce a usable product fact layer.

Files:

- `templates/base/docs/prompts/05-启动后交互契约.md`
- `templates/base/docs/prompts/20-产品-需求深访与PRD.md`
- `templates/base/docs/specs/01-项目启动卡.md`
- `templates/base/docs/specs/02-MVP范围与非目标.md`
- `templates/base/docs/specs/03-验收标准.md`

Work:

- Split product clarification into small stages: project intent, target user, MVP path, non-goals, acceptance criteria.
- Add a "one-question-at-a-time" rule with stop conditions.
- Add a clear handoff format from Product Agent to Frontend / Backend Agent.
- Add examples for "confirmed facts" and "待确认 facts".

Done when:

- A new project initialized with vague input will ask a useful first question.
- Product output is enough for another Agent to implement without reading the original chat.
- Missing facts are recorded as `待确认`, not silently guessed.

## Phase 2: Git prompt

Goal: make every later iteration easy to sync, review, revert, and continue on another computer.

Files:

- `templates/base/docs/prompts/50-Git-仓库维护.md`
- `docs/runbooks/git-sync-and-contribution.md`
- `templates/base/AGENTS.md`
- `SKILL.md`

Work:

- Define when to commit, when to wait, and when to push.
- Add "single logical change per commit" examples.
- Add a standard PR / change summary template.
- Add explicit rules for remote sync across computers.
- Add guidance for "prompt-only changes" versus "generated-project template changes".

Done when:

- The Agent can tell whether a change should be committed.
- The commit message captures intent, constraints, tests, and gaps.
- Another computer can safely pull and use the repo.

## Phase 3: Frontend prompt

Goal: make frontend work start from product intent and design quality, not from random component generation.

Files:

- `templates/base/docs/prompts/30-前端-设计与实现.md`
- `templates/base/docs/prompts/60-测试-交互视觉与验收.md`
- Future optional file: `templates/base/docs/prompts/31-前端-设计系统与风格.md`
- Future optional file: `templates/base/docs/prompts/32-前端-页面实现与状态.md`

Work:

- Split frontend into design intent, design system, page implementation, states, responsiveness, and visual QA.
- Add required inputs: target user, mood/style, reference, density, device targets.
- Add rules for when to ask for screenshot / DESIGN.md / PDF / reference site.
- Add a handoff format from Frontend Agent to Test Agent.
- Later incorporate Cloud Design notes when the PDF is available.

Done when:

- Frontend Agent asks for missing style direction before implementing.
- UI output includes empty/loading/error states and mobile checks.
- Visual QA has concrete criteria instead of "looks good".

## Phase 4: Backend prompt

Goal: make backend work follow product rules and interface contracts, not hidden assumptions.

Files:

- `templates/base/docs/prompts/40-后端-接口与数据.md`

Work:

- Split API contract, data model, permissions, background jobs, external services, and error handling.
- Add `.env.example` and runbook update requirements.
- Add interface handoff format for frontend.
- Add minimum backend verification cases.

Done when:

- Backend Agent does not invent business rules.
- API changes include tests or manual verification.
- Environment and run instructions are kept current.

## Phase 5: Test prompt

Goal: make testing find problems instead of merely confirming the happy path.

Files:

- `templates/base/docs/prompts/60-测试-交互视觉与验收.md`
- `templates/base/docs/specs/05-测试与验证策略.md`

Work:

- Split tests into engineering, interaction, ordinary-user UX, visual beauty, design compliance.
- Add Playwright screenshot expectations for frontend projects.
- Add "problem report" format suitable for fix handoff.
- Add "tester verifies fix" rule.

Done when:

- Test output contains reproducible problems and evidence.
- Visual issues are described concretely.
- Fixers and testers have separate roles.

## Phase 6: Collaboration / Linear / remote project management

Goal: add collaboration only after the single-project local loop is stable.

Files:

- `templates/base/docs/prompts/70-协作-远程仓库与Linear.md`
- Future optional file: `templates/base/docs/prompts/71-Linear-Issue与版本管理.md`
- Future optional file: `templates/base/docs/prompts/72-多Agent任务拆分.md`

Work:

- Define when a project deserves Linear.
- Define issue templates for feature, bug, test, docs, research.
- Define branch / issue / PR naming links.
- Keep repo docs as source of truth; Linear only manages workflow state.

Done when:

- Linear is clearly optional.
- The repo can be used without Linear.
- If Linear is enabled, issue state maps cleanly to docs and Git.

## Immediate next step

Start with Phase 1, but keep it small:

1. Rewrite `20-产品-需求深访与PRD.md`.
2. Tighten `05-启动后交互契约.md`.
3. Add one product handoff format.
4. Update smoke tests only if file names or required files change.

Then do Phase 2 Git before deep frontend work.

