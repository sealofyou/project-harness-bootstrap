# 模板专用化实施计划

> 目标：为 `project-harness-bootstrap` 增加 `base / frontend-only / frontend-fastapi` 三层模板结构，并支持自然语言自动模板选择。

### 任务 1：补测试，锁定目标行为

**文件：**
- 修改：`scripts/test-init-ai-harness.mjs`

**步骤：**

1. 为 `base`、`frontend-only`、`frontend-fastapi` 三种初始化结果写断言
2. 为自动模板选择写断言
3. 先运行测试，确认在现状下失败

### 任务 2：重组模板目录

**文件：**
- 创建：`templates/base/`
- 创建：`templates/frontend-only/`
- 创建：`templates/frontend-fastapi/`

**步骤：**

1. 将现有通用模板迁移为 `base`
2. 新增 `frontend-only` 覆盖层
3. 新增 `frontend-fastapi` 覆盖层

### 任务 3：实现脚本中的模板叠加逻辑

**文件：**
- 修改：`scripts/init-ai-harness.mjs`

**步骤：**

1. 增加模板选择参数与自动推断逻辑
2. 先复制 `base`
3. 再叠加专用模板
4. 输出最终使用的模板信息

### 任务 4：落 `frontend-fastapi` 模板细节

**文件：**
- 创建：`templates/frontend-fastapi/**`

**步骤：**

1. 增加前后端目录骨架
2. 增加 Python 环境初始化说明与脚本
3. 增加 FastAPI 示例、日志配置、测试占位
4. 在文档中写清日志与注释要求

### 任务 5：更新 skill 与仓库文档

**文件：**
- 修改：`SKILL.md`
- 修改：`README.md`

**步骤：**

1. 写清自动模板选择规则
2. 写清无需手动记 `--template`
3. 写清 `frontend-only` 与 `frontend-fastapi` 的差异

### 任务 6：跑验证并提交

**文件：**
- 全仓

**步骤：**

1. 运行 `node scripts/test-init-ai-harness.mjs`
2. 运行 skill 校验
3. 检查生成目录结构
4. 提交并推送
