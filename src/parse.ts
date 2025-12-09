/**
 * Mermaid 语法解析器
 */

import { exec } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export enum ParseStatus {
	SUCCESS,
	FAIL,
}

export interface ParseResult {
	status: ParseStatus;
	message?: string;
}

/**
 * 过滤错误输出中的冗余信息
 */
const filterErrorOutput = (errorOutput: string): string => {
	const filtered = errorOutput.replace(/npm warn[^\n]*\n/gi, "");
	const lines = filtered.split("\n");
	const filteredLines: string[] = [];
	let foundError = false;

	for (const line of lines) {
		const trimmed = line.trim();

		if (!trimmed || trimmed.toLowerCase().includes("npm warn")) continue;
		if (trimmed.startsWith("at ") || trimmed.startsWith("at async")) break;

		if (trimmed.startsWith("Error:") || foundError) {
			foundError = true;
			filteredLines.push(line);
		}
	}

	return filteredLines.length > 0
		? filteredLines.join("\n").trim()
		: errorOutput.trim();
};

/**
 * 解析 Mermaid 图表语法
 * @param inputFile 输入文件名
 * @param outputFile 输出文件名
 * @returns 解析结果
 */
export const parseMermaid = (
	inputFile: string = "input.mmd",
	outputFile: string = "output.svg",
): Promise<ParseResult> => {
	return new Promise((resolve) => {
		const inputPath = path.join(__dirname, inputFile);
		const outputPath = path.join(__dirname, outputFile);

		exec(
			`npx mmdc -i ${inputPath} -o ${outputPath}`,
			(err, _stdout, stderr) => {
				if (err) {
					const errorOutput = stderr || err.message || "";
					const filteredMessage = filterErrorOutput(errorOutput);
					resolve({
						status: ParseStatus.FAIL,
						message: filteredMessage || err.message || "未知错误",
					});
					return;
				}

				resolve({ status: ParseStatus.SUCCESS });
			},
		);
	});
};
