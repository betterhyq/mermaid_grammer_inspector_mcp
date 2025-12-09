#!/usr/bin/env node

/**
 * Mermaid 语法检查器 MCP 服务器
 * 提供 Mermaid 图表语法检查服务
 */

import { program } from "commander";
import { FastMCP } from "fastmcp";
import { z } from "zod";
import pkg from "../package.json";
import { checkMermaid } from "./check";
import { ParseStatus } from "./parse";

/**
 * 启动 MCP 服务器
 */
export const main = () => {
	program.name(pkg.name).description(pkg.description).version(pkg.version);

	program
		.option("--http", "使用 HTTP 传输模式")
		.option("-p, --port <number>", "HTTP 服务器端口", "3000")
		.parse();

	const { http, port } = program.opts();
	const [major, minor, patch] = pkg.version.split(".").map(Number);

	const server = new FastMCP({
		name: pkg.mcpName,
		version: `${major}.${minor}.${patch}`,
	});

	server.addTool({
		name: "check",
		description:
			"Check if the text is a valid mermaid diagram. Returns an empty string if valid, otherwise returns the error message.",
		parameters: z.object({
			text: z.string(),
		}),
		execute: async (args) => {
			const { status, message } = await checkMermaid(args.text);
			return status === ParseStatus.SUCCESS ? "" : message || "未知错误";
		},
	});

	if (http) {
		const portNum = parseInt(port, 10) || 3000;
		server.start({
			transportType: "httpStream",
			httpStream: { host: "0.0.0.0", port: portNum },
		});
		console.log(`🚀 MCP 服务器已启动 (HTTP 模式) - 端口: ${portNum}`);
	} else {
		server.start({ transportType: "stdio" });
	}
};

main();
