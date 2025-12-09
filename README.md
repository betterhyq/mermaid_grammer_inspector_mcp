# packageName

<!-- automd:badges license color=yellow -->

[![npm version](https://img.shields.io/npm/v/packageName?color=yellow)](https://npmjs.com/package/packageName)
[![npm downloads](https://img.shields.io/npm/dm/packageName?color=yellow)](https://npm.chart.dev/packageName)
[![license](https://img.shields.io/github/license/betterhyq/repository?color=yellow)](https://github.com/betterhyq/repository/blob/main/LICENSE)

<!-- /automd -->

## Usage

Install the package:

<!-- automd:pm-install global auto=false -->

```sh
# npm
npm installg packageName

# yarn
yarn addg packageName

# pnpm
pnpm addg packageName

# bun
bun installg packageName

# deno
deno installg npm:packageName
```

<!-- /automd -->

### NPX Cursor Config

```json
{
  "mcpServers": {
    "packageCommand": {
      "command": "npx",
      "type": "stdio",
      "transportType": "stdio",
      "args": [
        "-y",
        "packageCommand"
      ]
    }
  }
}
```

### Http Cursor Config

start the service locally

```bash
packageCommand --http --port=4000
```

set the config

```json
{
  "mcpServers": {
    "packageCommand": {
      "url": "http://0.0.0.0:4000/sse",
      "type": "sse",
      "transportType": "sse"
    }
  }
}
```

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/betterhyq/repository/blob/main/LICENSE) license.
Made by [community](https://github.com/betterhyq/repository/graphs/contributors) 💛
<br><br>
<a href="https://github.com/betterhyq/repository/graphs/contributors">
<img src="https://contrib.rocks/image?repo=betterhyq/repository" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
