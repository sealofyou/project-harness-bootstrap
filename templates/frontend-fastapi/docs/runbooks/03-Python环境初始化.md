# 03-Python环境初始化

## 优先策略

1. 若系统存在 `conda`，优先使用 `conda`
2. 若无 `conda`，则使用 `uv`
3. 若二者都没有，保留为 `待确认`

## 推荐命令

可直接运行：

```powershell
.\backend\scripts\bootstrap-env.ps1
```

## 初始化后补充事项

1. 将实际激活命令写回部署或运维手册
2. 将实际测试命令写回 `docs/specs/05-测试与验证策略.md`
3. 若安装过程出现额外依赖，记录到 runbook
