# AI项目-Harness-一句话启动说明-v1

> 用途：给未来的你一个最短可执行入口，用一句话启动一个带 Harness 的新项目。

## 一、推荐触发方式

### 方式 A：本地 Skill
如果本地已安装 `project-harness-bootstrap` skill，可直接说：

```text
使用 $project-harness-bootstrap 在 E:\workspace\Projects\my-app 初始化一个新项目：
项目名是 My App，目标是做一个给内容创作者使用的 AI 工作台，
第一版先完成登录、项目创建、内容生成与基础发布，技术栈优先 Next.js + Supabase。
```

### 方式 B：不用 Skill，直接用母提示词
如果当前环境没有 skill，也可以直接说：

```text
请按 AI 项目 Harness 规范为我初始化一个新项目。
目标路径：E:\workspace\Projects\my-app
项目名：My App
项目目标：做一个给内容创作者使用的 AI 工作台
第一版：先完成登录、项目创建、内容生成与基础发布
技术栈偏好：Next.js + Supabase

要求：
1. 先建立仓库内 Harness 骨架
2. 生成 AGENTS.md 与 docs/specs、docs/runbooks、docs/iterations、docs/reviews 模板
3. 把已知信息写入模板
4. 未知信息写成待确认项，但不要阻塞初始化
5. 后续所有实现、测试、验收、部署、文档回写都默认遵守这些文件
```

## 二、推荐最小输入字段

一句话里最好包含：

- 项目路径
- 项目名称
- 项目目标
- 第一版要做什么

可选补充：

- 目标用户
- 技术栈
- 部署偏好
- 明确不做什么

## 三、默认行为

如果你没有补齐所有字段，推荐默认策略：

- 缺少技术栈：写入“待确认”，先生成通用模板
- 缺少部署方式：先写成占位 runbook
- 缺少非目标：先给出默认非目标并标注待确认
- 缺少测试方案：先生成默认测试策略骨架

## 四、初始化完成后应该达到什么状态

至少应达到：

1. 新项目里已经有可读的 `AGENTS.md`
2. `docs/specs/` 已写入当前项目目标与 MVP
3. `docs/specs/05-测试与验证策略.md` 已定义验证入口
4. `docs/runbooks/` 已有部署与运维占位
5. `docs/iterations/ITERATION-001.md` 已可用于第一轮推进

## 五、一句话总结

> 一句话启动不是直接让 Agent 盲做，而是先让它把项目 Harness 初始化好，再进入连续迭代。
