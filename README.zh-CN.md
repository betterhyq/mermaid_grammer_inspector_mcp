# <img src="https://mermaid.js.org/favicon.svg" height="24"/> Mermaid Grammer Inspector

[![mcp server](https://badge.mcpx.dev?type=server 'MCP Server')](https://modelcontextprotocol.io/docs/getting-started/intro)
[![npm version](https://img.shields.io/npm/v/@betterhyq/mermaid-grammer-inspector-mcp?color=orange)](https://npmjs.com/package/@betterhyq/mermaid-grammer-inspector-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@betterhyq/mermaid-grammer-inspector-mcp?color=yellow)](https://npm.chart.dev/@betterhyq/mermaid-grammer-inspector-mcp)
[![license](https://img.shields.io/github/license/betterhyq/mermaid_grammer_inspector_mcp?color=yellow)](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/blob/main/LICENSE)

一个用于验证 Mermaid 图表语法并提供全面语法检查功能的模型上下文协议（MCP）服务器

[English](./README.md) | 简体中文

## 使用方法

安装包：

<!-- automd:pm-install global auto=false -->

```sh
# npm
npm installg @betterhyq/mermaid-grammer-inspector-mcp

# yarn
yarn addg @betterhyq/mermaid-grammer-inspector-mcp

# pnpm
pnpm addg @betterhyq/mermaid-grammer-inspector-mcp

# bun
bun installg @betterhyq/mermaid-grammer-inspector-mcp

# deno
deno installg npm:@betterhyq/mermaid-grammer-inspector-mcp
```

<!-- /automd -->

### NPX Cursor 配置

```json
{
  "mcpServers": {
    "mermaid-grammer-inspector": {
      "command": "npx",
      "type": "stdio",
      "transportType": "stdio",
      "args": [
        "-y",
        "mermaid-grammer-inspector"
      ]
    }
  }
}
```

### Http Cursor 配置

在本地启动服务

```bash
mermaid-grammer-inspector --http --port=4000
```

设置配置

```json
{
  "mcpServers": {
    "mermaid-grammer-inspector": {
      "url": "http://0.0.0.0:4000/sse",
      "type": "sse",
      "transportType": "sse"
    }
  }
}
```

## 许可证

<!-- automd:contributors license=MIT -->

基于 [MIT](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/blob/main/LICENSE) 许可证发布。
由 [社区](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/graphs/contributors) 制作 💛
<br><br>
<a href="https://github.com/betterhyq/mermaid_grammer_inspector_mcp/graphs/contributors">
<img src="https://contrib.rocks/image?repo=betterhyq/mermaid_grammer_inspector_mcp" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 使用 [automd](https://automd.unjs.io) 自动更新_

<!-- /automd -->