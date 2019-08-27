# ks-thanos-cli
灭霸系统命令行工具（nodejs）

旨在为开发者快速生成模板化的中台页面

## 开发步骤

1. 使用 `tsc` 编译文件

```
npm start
```

2. 将模块映射到全局的 `node_modules` 中

```
npm link
```

3. 此时使用以下命令，便能使用工具创建页面了，且项目代码变化后，同样能应用更新

```
ks-thanos-cli sync [pageName]
```

> `[pageName]` 为页面名称

4. 在使用 `npm link` 命令后，以后每次进行开发，只需要使用 `npm start` 命令开启代码编译即可