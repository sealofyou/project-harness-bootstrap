# AI项目-Harness-仓库模板规范-v1

> 用途：定义一个新项目初始化时，仓库里最小应该落哪些文件，分别承担什么职责。

## 一、目标

让任何 Agent 进入一个新项目时，不依赖历史聊天，也能知道：

- 项目要做什么
- 当前版本做什么
- 什么不做
- 如何测试
- 如何验收
- 什么时候该停下来问人
- 如何部署和回写

## 二、最小目录

```text
AGENTS.md
CLAUDE.md
docs/specs/01-项目启动卡.md
docs/specs/02-MVP范围与非目标.md
docs/specs/03-验收标准.md
docs/specs/04-人工闸门.md
docs/specs/05-测试与验证策略.md
docs/prompts/00-提示词索引.md
docs/runbooks/01-部署手册.md
docs/runbooks/02-运维手册.md
docs/iterations/ITERATION-001.md
docs/reviews/回写与复盘模板.md
```

## 三、每个文件负责什么

### `AGENTS.md`
负责定义本项目内所有 Agent 的总规约。

### `CLAUDE.md`
负责定义 Claude Code 进入项目时的入口规则，并与 `AGENTS.md` 共享同一事实层。

### `docs/specs/01-项目启动卡.md`
负责记录项目目标、目标用户、交付物、阶段状态。

### `docs/specs/02-MVP范围与非目标.md`
负责记录这版必须做什么、明确不做什么、后续候选项。

### `docs/specs/03-验收标准.md`
负责记录功能、体验、技术与发布前门槛。

### `docs/specs/04-人工闸门.md`
负责记录哪些节点必须暂停问人，哪些节点可以自动继续。

### `docs/specs/05-测试与验证策略.md`
负责记录测试入口、验证层级、发布前最小验证集合。

### `docs/prompts/00-提示词索引.md`
负责记录产品、前端、后端、Git、测试、协作等提示词资产的调用边界。

### `docs/runbooks/01-部署手册.md`
负责记录部署步骤、环境、回滚。

### `docs/runbooks/02-运维手册.md`
负责记录监控项、常见故障与运维动作。

### `docs/iterations/ITERATION-001.md`
负责记录当前轮目标、动作、验证、风险与下一轮建议。

### `docs/reviews/回写与复盘模板.md`
负责记录本轮决策、偏差、风险与长期文档回写项。

## 四、初始化原则

1. 先生成骨架，再逐步填实
2. 把不确定性写成待确认项
3. 每个文件都要写到“换个 Agent 也能接手”的程度

## 五、使用方式

推荐在新项目开始时执行两步：

1. 让主 Agent 参考本仓库模板，在目标项目中建立 Harness 骨架。
2. 让主 Agent 根据用户的一句话输入回填关键字段，并继续追问最关键的问题。

## 六、一句话总结

> 项目 Harness 的关键，不是文档多，而是每个关键责任都有固定落点。
