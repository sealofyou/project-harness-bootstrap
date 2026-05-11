# Git 同步与协作说明

## 当前原则

本仓库的改动不会自动提交和推送。

Agent 修改文件后，默认状态是本地工作区改动。只有在明确进入收尾阶段，或用户要求提交 / 推送时，才应该执行 `git commit` 和 `git push`。

这样做的原因是：提示词和模板还在快速迭代期，本地先验证、再提交，能避免把半成品推到远程。

## 什么时候应该提交

适合提交：

- 一组提示词文件已经能被初始化脚本生成。
- `node scripts/test-init-ai-harness.mjs` 通过。
- README / SKILL / AGENTS 的说明已经和模板行为一致。
- 本轮改动有清楚边界，例如“新增启动后交互契约”或“新增 prompts 分类”。

暂时不要提交：

- 只改了一半，还没跑测试。
- 只是临时记录想法。
- 外部文章还没读完，内容只是占位。
- 改动混杂了多个主题，无法写清楚提交意图。

## 推荐提交流程

```powershell
git status --short --branch
node scripts/test-init-ai-harness.mjs
git diff --stat
git add README.md SKILL.md scripts/test-init-ai-harness.mjs templates/base docs/runbooks
git commit
git push origin main
```

提交信息遵守 Lore commit protocol。示例：

```text
Make project bootstrap continue into product clarification

The harness already generated prompt assets, but bootstrap completion could still
stop at file creation. This records a startup interaction contract so newly
created projects enter confirmed-vs-unknown review and ask the first product
question before implementation.

Constraint: Startup behavior must remain stack-agnostic
Confidence: high
Scope-risk: narrow
Tested: node scripts/test-init-ai-harness.mjs
Not-tested: Hermes runtime integration on a separate machine
```

## 另一台电脑如何同步使用

第一次使用：

```powershell
git clone git@github.com:sealofyou/project-harness-bootstrap.git
cd project-harness-bootstrap
node scripts/test-init-ai-harness.mjs
```

已有仓库时更新：

```powershell
cd path\to\project-harness-bootstrap
git status --short --branch
git pull --ff-only origin main
node scripts/test-init-ai-harness.mjs
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
- `templates/base/docs/specs/05-测试与验证策略.md`：测试和验收策略。
- `SKILL.md`：Codex skill 启动行为。
- `README.md`：给人看的使用说明。
- `scripts/test-init-ai-harness.mjs`：每次新增模板文件后补断言。

新增提示词时：

1. 先在 `templates/base/docs/prompts/` 新增文件。
2. 更新 `00-提示词索引.md`。
3. 如果会影响默认行为，更新 `10-系统-默认协作流程.md`。
4. 如果初始化后必须读取，更新 `templates/base/AGENTS.md`。
5. 更新测试断言。
6. 跑 `node scripts/test-init-ai-harness.mjs`。

## 多电脑协作建议

- 每台电脑开始前先 `git pull --ff-only origin main`。
- 一台电脑做完一组完整改动后再提交推送。
- 不要两台电脑同时改同一个提示词文件。
- 临时想法先放本地笔记或新草稿文件，不要直接改系统提示词。
- 如果发现某条规则已经存在，只补充缺口，不重复写第二遍。

