# AGENTS.md - 多 Agent 项目启动模板

本仓库是一个面向 Codex / Agent 的项目启动模板库。

它的目标不是让用户记住脚本命令，而是让 Agent 在新项目里建立清楚的事实层、提示词资产、协作规则和验证流程，然后通过持续对话把项目逐步推进成可用产品。

## 进入本仓库后先读

1. `README.md`
2. `CLAUDE.md`
3. `docs/plans/2026-05-11-提示词优化路线图.md`
4. `templates/base/AGENTS.md`
5. `templates/base/docs/prompts/00-提示词索引.md`
6. 当前任务相关的 `templates/base/docs/prompts/*.md`

## 当前仓库定位

本仓库保存三类资产：

- 项目启动规则：`templates/base/AGENTS.md`、`templates/base/CLAUDE.md`
- 项目事实层模板：`templates/base/docs/specs/`、`runbooks/`、`iterations/`、`reviews/`
- Agent 提示词资产：`templates/base/docs/prompts/`

不要把它当成固定技术栈生成器。

不要默认新项目一定是 React、Vue、Next.js、FastAPI 或其他框架。技术栈必须来自用户目标、已有项目上下文或明确确认。

## 工作方式

默认通过 Agent 对话推进：

1. 主 Agent 读取本仓库规则和模板。
2. 主 Agent 读取目标项目现状。
3. 主 Agent 将必要规则复制或改写到目标项目。
4. 未知信息写入 `待确认`。
5. 进入产品深访，先问最关键的问题。
6. 需求清楚后，再分派前端、后端、测试、Git 等子 Agent。

## 多 Agent 规则

主 Agent 负责：

- 维护目标和范围。
- 分配任务边界。
- 协调共享文件。
- 集成结果。
- 最终验证。
- 提交和推送前的判断。

子 Agent 负责：

- 在授权范围内完成单一类型任务。
- 不自行扩大范围。
- 不自行提交或推送。
- 遇到共享文件、范围冲突或重大不确定性时交回主 Agent。

## 文档规则

默认使用中文。

必须使用中文的内容：

- 文档名称
- 文档标题
- 文档正文
- README
- 变更说明
- 提交标题中的说明部分
- 测试报告

允许保留英文的内容：

- 代码
- 命令
- 文件扩展名
- API 名称
- 包名
- 框架名
- 配置键
- 环境变量
- 固定协议名或专有名词

## 修改规则

修改本仓库时优先保持提示词和模板清楚。

如果新增提示词：

1. 放入 `templates/base/docs/prompts/`。
2. 更新 `templates/base/docs/prompts/00-提示词索引.md`。
3. 如果会影响默认流程，更新 `templates/base/docs/prompts/10-系统-默认协作流程.md`。
4. 如果新项目初始化后必须读取，更新 `templates/base/AGENTS.md`。
5. 更新 `README.md` 或 `SKILL.md` 中的对外说明。

## Git 规则

提交标题使用中文 Conventional Commit：

```text
feat: 增加前端设计提示词
fix: 修正启动后不追问的问题
docs: 改写中文入口说明
```

提交正文使用 Lore 风格记录约束、取舍、验证和未测项。

当前环境还要求保留：

```text
Co-authored-by: OmX <omx@oh-my-codex.dev>
```

## 验证规则

本仓库当前不以脚本作为主要入口。

修改文档和模板后至少检查：

- `git diff --check`
- `rg` 搜索是否还残留过时入口说明
- 关键文件是否能被根目录 `README.md`、`AGENTS.md`、`CLAUDE.md` 串起来

不要在没有验证证据时说“已经完成”。
