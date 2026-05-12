# Git 同步与协作说明

## 当前原则

本仓库的主要入口是 Agent 对话和项目内文档，不再把初始化脚本作为默认使用方式。

Agent 修改文件后，默认状态是本地工作区改动。只有在明确进入收尾阶段，或用户要求提交 / 推送时，才执行 `git commit` 和 `git push`。

这样做的原因是：提示词和模板仍在快速迭代期，本地先检查、再提交，能避免把半成品推到远程。

## 什么时候应该提交

适合提交：

- 一组提示词或模板已经形成清楚边界。
- 根目录 `README.md`、`AGENTS.md`、`CLAUDE.md`、`SKILL.md` 的说明已经一致。
- `git diff --check` 通过。
- 已用 `rg` 检查是否残留过时入口说明。
- 本轮改动可以用一句中文提交标题说清楚。

暂时不要提交：

- 只改了一半，还没有检查。
- 只是临时记录想法。
- 外部文章还没读完，内容只是占位。
- 改动混杂了多个主题，无法写清楚提交意图。

## 推荐提交流程

```powershell
git status --short --branch
git diff --check
rg "过时关键词" -n
git diff --stat
git add <本轮相关文件>
git commit
git push origin main
```

提交标题必须使用中文 Conventional Commit：

```text
feat: 增加启动后交互契约
fix: 修正初始化后不追问的问题
docs: 改写中文入口说明
test: 覆盖提示词模板生成
```

正文继续保留 Lore 风格的结构化信息：

```text
docs: 改写中文入口说明

仓库入口从脚本使用说明调整为 Agent 对话式协作说明，并补齐根目录 AGENTS.md 与 CLAUDE.md。

Constraint: 本仓库当前不以脚本作为默认入口
Confidence: high
Scope-risk: narrow
Tested: git diff --check
Not-tested: 未在全新目标项目中做完整迁移演练
Co-authored-by: OmX <omx@oh-my-codex.dev>
```

## 另一台电脑如何同步使用

第一次使用：

```powershell
git clone git@github.com:sealofyou/project-harness-bootstrap.git
cd project-harness-bootstrap
```

已有仓库时更新：

```powershell
cd path\to\project-harness-bootstrap
git status --short --branch
git pull --ff-only origin main
```

如果本地也有改动，先不要直接 pull：

```powershell
git status --short
git diff --stat
```

确认本地改动要保留时，先提交或 stash，再 pull。

## 如何继续往这个项目补提示词

优先改这些位置：

- `templates/base/docs/prompts/`：默认提示词资产。
- `templates/base/AGENTS.md`：生成后项目的总规则。
- `templates/base/CLAUDE.md`：生成后项目的 Claude 入口规则。
- `templates/base/docs/specs/05-测试与验证策略.md`：测试和验收策略。
- `SKILL.md`：作为 Skill 使用时的对话式启动行为。
- `README.md`：给人看的中文使用说明。
- `AGENTS.md`：本仓库自己的 Agent 协作规则。
- `CLAUDE.md`：本仓库自己的 Claude 协作规则。

新增提示词时：

1. 先在 `templates/base/docs/prompts/` 新增文件。
2. 更新 `00-提示词索引.md`。
3. 如果会影响默认行为，更新 `10-系统-默认协作流程.md`。
4. 如果目标项目初始化后必须读取，更新 `templates/base/AGENTS.md` 和 `templates/base/CLAUDE.md`。
5. 更新根目录 `README.md` 或 `SKILL.md` 的入口说明。
6. 跑 `git diff --check`。

## 多电脑协作建议

- 每台电脑开始前先 `git pull --ff-only origin main`。
- 一台电脑做完一组完整改动后再提交推送。
- 不要两台电脑同时改同一个提示词文件。
- 临时想法先放本地笔记或新草稿文件，不要直接改系统提示词。
- 如果发现某条规则已经存在，只补充缺口，不重复写第二遍。

## 多 Agent 并行建议

如果同一个主 session 要调度多个子 Agent，例如前端、后端、测试同时推进，优先使用独立分支或 worktree 隔离改动。

推荐做法：

- 主 session 只负责拆任务、分配文件范围、集成结果和最终验证。
- 前端设计子 Agent 只整理设计系统和页面结构。
- 前端实现子 Agent 只改前端相关文件。
- 后端子 Agent 只改后端相关文件。
- 测试子 Agent 优先做验收和报告，不直接修业务代码。
- Git 子 Agent 只整理提交边界和 PR / 变更说明。

共享文件必须由主 session 统一协调，例如：

- 根目录配置
- 依赖锁文件
- 环境变量示例
- 接口契约
- 数据库迁移
- `AGENTS.md`
- `CLAUDE.md`

多 Agent 结果合并前必须检查是否出现互相覆盖、接口不一致或文档事实冲突。
