# <img src="https://mermaid.js.org/favicon.svg" height="24"/> Mermaid Grammer Inspector

[![mcp server](https://badge.mcpx.dev?type=server 'MCP Server')](https://modelcontextprotocol.io/docs/getting-started/intro)
[![npm version](https://img.shields.io/npm/v/@betterhyq/mermaid-grammer-inspector-mcp?color=orange)](https://npmjs.com/package/@betterhyq/mermaid-grammer-inspector-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@betterhyq/mermaid-grammer-inspector-mcp?color=yellow)](https://npm.chart.dev/@betterhyq/mermaid-grammer-inspector-mcp)
[![license](https://img.shields.io/github/license/betterhyq/mermaid_grammer_inspector_mcp?color=yellow)](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/blob/main/LICENSE)

<a href="https://glama.ai/mcp/servers/@holyfata/Mermaid-Grammer-Inspector">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@holyfata/Mermaid-Grammer-Inspector/badge" />
</a>

A Model Context Protocol (MCP) server for validating Mermaid diagram syntax and providing comprehensive grammar checking capabilities

English | [简体中文](./README.zh-CN.md)

## Usage

Install the package:

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

### NPX Cursor Config

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

### Http Cursor Config

start the service locally

```bash
mermaid-grammer-inspector --http --port=4000
```

set the config

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

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/blob/main/LICENSE) license.
Made by [community](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/graphs/contributors) 💛
<br><br>
<a href="https://github.com/betterhyq/mermaid_grammer_inspector_mcp/graphs/contributors">
<img src="https://contrib.rocks/image?repo=betterhyq/mermaid_grammer_inspector_mcp" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
