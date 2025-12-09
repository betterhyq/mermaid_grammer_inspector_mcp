/**
 * Check 模块测试用例
 */

import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkMermaid } from "./check";
import { ParseStatus } from "./parse";

// Mock fs module
vi.mock("node:fs", () => ({
	default: {
		writeFileSync: vi.fn(),
	},
}));

// Mock parse module
vi.mock("./parse", () => ({
	parseMermaid: vi.fn(),
	ParseStatus: {
		SUCCESS: 0,
		FAIL: 1,
	},
}));

// Import the mocked modules
const mockFs = vi.mocked(fs);

describe("checkMermaid", () => {
	let mockParseMermaid: ReturnType<typeof vi.fn>;

	beforeEach(async () => {
		vi.clearAllMocks();
		// Import the parse module to get the mocked function
		const parseModule = await import("./parse");
		mockParseMermaid = parseModule.parseMermaid as unknown as ReturnType<
			typeof vi.fn
		>;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("应该成功检查有效的 Mermaid 语法", async () => {
		const validMermaidText = `
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
    `;

		// Mock successful parsing
		vi.mocked(mockParseMermaid).mockResolvedValue({
			status: ParseStatus.SUCCESS,
		});

		const result = await checkMermaid(validMermaidText);

		expect(mockFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining("input.mmd"),
			validMermaidText,
			{ encoding: "utf-8" },
		);
		expect(mockParseMermaid).toHaveBeenCalled();
		expect(result.status).toBe(ParseStatus.SUCCESS);
		expect(result.message).toBeUndefined();
	});

	it("应该检测到无效的 Mermaid 语法", async () => {
		const invalidMermaidText = `
flowchart TD
    A[Start] --> 
    B --> C[End]
    `;

		const errorMessage = "Parse error: Invalid syntax";

		// Mock failed parsing
		vi.mocked(mockParseMermaid).mockResolvedValue({
			status: ParseStatus.FAIL,
			message: errorMessage,
		});

		const result = await checkMermaid(invalidMermaidText);

		expect(mockFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining("input.mmd"),
			invalidMermaidText,
			{ encoding: "utf-8" },
		);
		expect(mockParseMermaid).toHaveBeenCalled();
		expect(result.status).toBe(ParseStatus.FAIL);
		expect(result.message).toBe(errorMessage);
	});

	it("应该处理空的 Mermaid 文本", async () => {
		const emptyText = "";

		vi.mocked(mockParseMermaid).mockResolvedValue({
			status: ParseStatus.FAIL,
			message: "Empty diagram",
		});

		const result = await checkMermaid(emptyText);

		expect(mockFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining("input.mmd"),
			emptyText,
			{ encoding: "utf-8" },
		);
		expect(result.status).toBe(ParseStatus.FAIL);
	});

	it("应该处理包含特殊字符的 Mermaid 文本", async () => {
		const specialCharText = `
flowchart TD
    A["特殊字符"] --> B[正常节点]
    B --> C["中文节点"]
    `;

		vi.mocked(mockParseMermaid).mockResolvedValue({
			status: ParseStatus.SUCCESS,
		});

		const result = await checkMermaid(specialCharText);

		expect(mockFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining("input.mmd"),
			specialCharText,
			{ encoding: "utf-8" },
		);
		expect(result.status).toBe(ParseStatus.SUCCESS);
	});

	it("应该处理文件写入失败的情况", async () => {
		const mermaidText = "flowchart TD\n    A --> B";

		// Mock file write error
		mockFs.writeFileSync.mockImplementation(() => {
			throw new Error("Permission denied");
		});

		const result = await checkMermaid(mermaidText);

		expect(result.status).toBe(ParseStatus.FAIL);
		expect(result.message).toContain("无法写入临时文件");
		expect(result.message).toContain("Permission denied");
	});

	it("应该处理非 Error 类型的异常", async () => {
		const mermaidText = "flowchart TD\n    A --> B";

		// Mock non-Error exception
		mockFs.writeFileSync.mockImplementation(() => {
			throw "String error";
		});

		const result = await checkMermaid(mermaidText);

		expect(result.status).toBe(ParseStatus.FAIL);
		expect(result.message).toContain("无法写入临时文件");
		expect(result.message).toContain("文件写入失败");
	});

	it("应该使用正确的文件路径", async () => {
		const mermaidText = "flowchart TD\n    A --> B";

		vi.mocked(mockParseMermaid).mockResolvedValue({
			status: ParseStatus.SUCCESS,
		});

		await checkMermaid(mermaidText);

		const writeCall = mockFs.writeFileSync.mock.calls[0];
		const filePath = writeCall[0] as string;

		expect(path.basename(filePath)).toBe("input.mmd");
		expect(filePath).toContain("src");
	});

	it("应该使用 UTF-8 编码写入文件", async () => {
		const mermaidText = "flowchart TD\n    A --> B";

		vi.mocked(mockParseMermaid).mockResolvedValue({
			status: ParseStatus.SUCCESS,
		});

		await checkMermaid(mermaidText);

		expect(mockFs.writeFileSync).toHaveBeenCalledWith(
			expect.any(String),
			mermaidText,
			{ encoding: "utf-8" },
		);
	});
});
