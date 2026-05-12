# Claude Design 参考整理

日期：2026-05-13

## 查找结论

本次没有确认到 Anthropic 官方完整开源 Claude Design 源码。

可参考的是公开生态中的几类材料：

- Claude Design system prompt gist：整理了 Claude Design 类工具的系统提示词结构。链接：`https://gist.github.com/hqman/f46d5479a5b663c282c94faa8be866de`
- Open Design：复刻 Claude Design 工作流的开源项目，强调灵感收集、生成设计、快速迭代。官网：`https://opendesigner.io/`
- TypeUI：提供 `SKILL.md` / `DESIGN.md` 设计技能生成方式。GitHub：`https://github.com/bergside/typeui`
- Awesome Claude Design：强调 `DESIGN.md` 作为项目设计系统和风格约束来源。GitHub：`https://github.com/rohitg00/awesome-claude-design`
- Awesome Design MD：提供可复用 `DESIGN.md` 风格集合。GitHub：`https://github.com/VoltAgent/awesome-claude-design`
- HyperFrames：提供 Claude Design 风格的生成、评审和部署规则。文档：`https://hyperframes.heygen.com/guides/claude-design`，GitHub 指令文件：`https://github.com/heygen-com/hyperframes/blob/main/docs/guides/claude-design-hyperframes.md`

这些资料不能直接当作本项目规则照搬，但可以提炼成稳定方法。

## 可复用方法

### 1. 先找上下文，再做设计

设计 Agent 不应从空白画布开始。

优先读取：

- 现有代码和组件。
- 设计系统或 `DESIGN.md`。
- 截图、Figma、品牌规范、竞品链接。
- 用户提供的行业、气质、目标用户和核心路径。

缺少关键上下文时，应先追问，不假装已经完成高保真设计。

### 2. 设计探索要有多个方向

如果用户没有明确只要一版，前端设计应提供 2 到 3 个方向：

- 保守方向。
- 推荐方向。
- 探索方向。

每个方向要说明适用场景、代价和实现成本，不能只是换颜色。

### 3. 设计交付必须能被实现和验收

设计交付不只是审美描述。

它应该包含：

- 页面结构。
- 信息层级。
- 设计系统约束。
- 关键组件。
- 状态规则。
- 响应式规则。
- 可访问性底线。
- 视觉验收重点。

### 4. 实现阶段不重新发明设计

前端实现 Agent 应读取设计交接，把它落成页面、组件、状态和浏览器验证。

如果设计细节缺失，可以做低风险补全，但必须写成实现决策并回写。

## 已落地到本仓库

- `templates/base/docs/prompts/31-前端-设计系统与风格.md`
  - 增加设计上下文收集。
  - 增加多方向探索。
  - 增加设计推理。
  - 增加 Claude Design 方法转译。

- `templates/base/docs/prompts/32-前端-页面实现与状态.md`
  - 新增前端实现专门提示词。
  - 负责页面、组件、状态、响应式和浏览器验证。

- `templates/base/docs/prompts/30-前端-设计与实现.md`
  - 改为前端总入口，分流到设计和实现提示词。

## 后续

如果用户提供 Cloud Design / Claude Design PDF：

1. 先完整阅读 PDF。
2. 提取其中可复用的流程、输出格式和验收标准。
3. 对照本文件，补充缺口。
4. 优先更新 `31-前端-设计系统与风格.md` 和 `32-前端-页面实现与状态.md`。
