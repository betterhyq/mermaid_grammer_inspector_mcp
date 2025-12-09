#!/usr/bin/env node

import { program } from "commander";
import { FastMCP } from "fastmcp";
import { z } from "zod";
import pkg from "../package.json";
import { add } from "./add";

export const main = () => {
	program.name(pkg.name).description(pkg.description).version(pkg.version);

	program
		.option("--http", "使用 HTTP 传输模式（默认为 stdio 模式）")
		.option("-p, --port <number>", "指定 HTTP 服务器监听端口", "3000")
		.parse();

	const { http, port } = program.opts();

	const versions = pkg.version.split(".");
	const server = new FastMCP({
		name: pkg.mcpName,
		version: `${Number(versions[0])}.${Number(versions[1])}.${Number(versions[2])}`,
	});

	server.addTool({
		name: "Add Tool",
		description: "Add two numbers",
		parameters: z.object({
			a: z.number(),
			b: z.number(),
		}),
		execute: async (args) => add(args),
	});

	if (http) {
		server.start({
			transportType: "httpStream",
			httpStream: {
				host: "0.0.0.0",
				port: parseInt(port, 10) || 3000,
			},
		});
		console.log(`🚀 MCP 服务器已启动 (HTTP 模式) - 端口: ${port || 3000}`);
	} else {
		server.start({ transportType: "stdio" });
	}
};

main();
