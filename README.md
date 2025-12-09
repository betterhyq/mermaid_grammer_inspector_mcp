# Mermaid Grammer Inspector

<!-- automd:badges license color=yellow -->

[![npm version](https://img.shields.io/npm/v/@betterhyq/mermaid-grammer-inspector-mcp?color=yellow)](https://npmjs.com/package/@betterhyq/mermaid-grammer-inspector-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@betterhyq/mermaid-grammer-inspector-mcp?color=yellow)](https://npm.chart.dev/@betterhyq/mermaid-grammer-inspector-mcp)
[![license](https://img.shields.io/github/license/betterhyq/mermaid_grammer_inspector_mcp?color=yellow)](https://github.com/betterhyq/mermaid_grammer_inspector_mcp/blob/main/LICENSE)

<!-- /automd -->

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
