/**
 * Mermaid 语法检查器
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type ParseResult, ParseStatus, parseMermaid } from "./parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 检查 Mermaid 图表语法
 * @param text Mermaid 语法文本
 * @returns 检查结果
 */
export const checkMermaid = async (text: string): Promise<ParseResult> => {
	const inputFilePath = path.join(__dirname, "input.mmd");

	try {
		fs.writeFileSync(inputFilePath, text, { encoding: "utf-8" });
		return await parseMermaid();
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "文件写入失败";
		return {
			status: ParseStatus.FAIL,
			message: `无法写入临时文件: ${errorMessage}`,
		};
	}
};
