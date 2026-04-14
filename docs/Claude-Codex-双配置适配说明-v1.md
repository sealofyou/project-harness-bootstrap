# Claude/Codex 双配置适配说明-v1

## 目标

这份仓库可以同时作为 `Codex` 和 `Claude Code` 的项目启动底座，但前提是：

1. 共用同一套项目事实来源
2. 不复用外部作者的人设或协作口径
3. 用户协作风格来自当前用户自己的文档

## 一致性原则

对于同一个项目：

- `AGENTS.md` 面向 Codex
- `CLAUDE.md` 面向 Claude Code
- `docs/specs/`、`docs/runbooks/`、`docs/iterations/`、`docs/reviews/` 作为共同的 system of record

也就是说：

1. 行为入口可以有两份
2. 项目事实不应该有两份

## 推荐做法

### 对 Codex

使用项目内：

- `AGENTS.md`

### 对 Claude Code

使用项目内：

- `CLAUDE.md`

### 对二者共同生效

使用项目内：

- `docs/specs/`
- `docs/runbooks/`
- `docs/iterations/`
- `docs/reviews/`

## 画像与协作风格来源

不要照抄外部作者的 `CLAUDE.md` 或人设描述。

如果是为尔玉使用，这些信息应优先来自尔玉自己的资料：

- `E:\workspace\USER.md`
- `E:\workspace\article\AI玩尔玉-账号启动与协作入口.md`
- `E:\workspace\article\03_知识库\04-个人\个人资料\尔玉人物画像.md`
- `E:\workspace\article\CLAUDE.md`

## 当前判断

这套项目现在已经可以作为：

1. Codex 项目配置底座
2. Claude Code 项目配置底座

但更稳妥的形态应该是：

- 同时生成 `AGENTS.md`
- 同时生成 `CLAUDE.md`
- 让两者都把 `docs/specs/` 视为共同事实来源

## 一句话总结

> 可以同时给 Claude 和 Codex 用，但关键不是复制两套规则，而是让两者共用同一套项目事实层，并用当前用户自己的画像与协作文档来驱动入口文件。
