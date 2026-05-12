---
name: project-harness-bootstrap
description: Use when starting a brand-new software, website, AI product, or existing repo cleanup and wanting an Agent-guided project harness with AGENTS.md, CLAUDE.md, specs, prompts, runbooks, iterations, reviews, and multi-agent workflow rules before implementation begins.
---

# Project Harness Bootstrap

## 定位

这个 Skill 用来帮助用户通过 Agent 对话初始化或整理一个项目。

它不要求用户运行脚本，也不把新项目固定到某个技术栈。它的核心任务是让目标项目先拥有稳定的事实层、协作规则、提示词资产和验收流程，然后继续通过对话把需求、设计、实现和测试推进下去。

## 适用场景

当用户说类似这些话时使用：

- 初始化一个新项目。
- 整理一个已有仓库，让它更适合 Agent 协作。
- 想让以后开发新项目更省力。
- 想把产品、前端、后端、Git、测试提示词沉淀到项目里。
- 想用主 Agent 调度多个子 Agent 推进项目。

## 先读这些文件

在本仓库中先读：

1. `README.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `docs/plans/2026-05-11-提示词优化路线图.md`
5. `templates/base/AGENTS.md`
6. `templates/base/CLAUDE.md`
7. `templates/base/docs/prompts/00-提示词索引.md`
8. `templates/base/docs/prompts/05-启动后交互契约.md`

如果任务涉及具体阶段，再读对应提示词：

- 产品 / PRD：`templates/base/docs/prompts/20-产品-需求深访与PRD.md`
- 前端设计：`templates/base/docs/prompts/31-前端-设计系统与风格.md`
- 前端实现：`templates/base/docs/prompts/32-前端-页面实现与状态.md`
- 后端：`templates/base/docs/prompts/40-后端-接口与数据.md`
- Git：`templates/base/docs/prompts/50-Git-仓库维护.md`
- 测试：`templates/base/docs/prompts/60-测试-交互视觉与验收.md`
- 协作 / Linear：`templates/base/docs/prompts/70-协作-远程仓库与Linear.md`

## 对话式初始化流程

1. 确认目标项目位置。
2. 读取目标项目当前目录结构和已有规则。
3. 判断目标项目是否已经有 `AGENTS.md`、`CLAUDE.md`、`docs/specs/`、`docs/prompts/`、`docs/runbooks/`、`docs/iterations/`、`docs/reviews/`。
4. 缺什么补什么，已有内容要保留并合并，不要粗暴覆盖。
5. 把用户已经说清楚的信息写入目标项目文档。
6. 不确定的信息写成 `待确认`。
7. 初始化后读取目标项目的新规则。
8. 列出已确认信息和待确认信息。
9. 继续问用户一个最关键的问题。

不要只回复“文件已创建”。

## 推荐生成到目标项目的结构

```text
AGENTS.md
CLAUDE.md
docs/
  specs/
  prompts/
  runbooks/
  iterations/
  reviews/
```

如果项目已经有自己的结构，优先融入现有结构，不强行重排。

## 项目形态判断

项目形态要来自用户目标和目标项目现状。

可以参考：

- `templates/base/`：通用项目。
- `templates/frontend-only/`：纯前端项目。
- `templates/frontend-fastapi/`：前端加 FastAPI 项目。

但这些只是参考模板，不是技术栈默认值。

不要在用户没有确认时，把项目锁定成 React、Vue、Next.js、FastAPI 或任何具体框架。

## 多 Agent 使用规则

主 Agent 负责整体项目控制：

- 维护目标和事实层。
- 拆分任务。
- 分配子 Agent 职责。
- 协调共享文件。
- 集成结果。
- 做最终验证。
- 决定是否提交和推送。

子 Agent 只负责单一领域：

- 产品
- 前端设计
- 前端实现
- 后端
- 测试
- Git
- 协作

子 Agent 不自行扩大范围，不自行提交推送，不替代主 Agent 做完成判断。

## 完成标准

一次初始化或整理完成前，至少确认：

- 目标项目已有可读的 `AGENTS.md`。
- Claude 使用场景下已有 `CLAUDE.md`。
- 项目事实层已经存在。
- 提示词资产已经放在稳定位置。
- 未确认信息已经写成 `待确认`。
- 已经提出下一步最关键问题。

## 禁止事项

- 不要把脚本运行作为默认入口。
- 不要让用户自己记模板参数。
- 不要因为模板里有某个项目形态，就默认所有项目都用它。
- 不要覆盖目标项目已有规则。
- 不要初始化后停止追问。
