/**
 * Parse 模块测试用例
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { parseMermaid, ParseStatus, type ParseResult } from './parse';

// Mock the child_process module
vi.mock('node:child_process', () => ({
  exec: vi.fn()
}));

describe('parseMermaid', () => {
  let mockExec: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Get the mocked exec function
    const childProcess = await import('node:child_process');
    mockExec = childProcess.exec as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该在成功解析时返回 SUCCESS 状态', async () => {
    // Mock successful execution
    mockExec.mockImplementation((command: string, callback: Function) => {
      callback(null, 'success output', '');
      return {} as any;
    });

    const result = await parseMermaid('test.mmd', 'test.svg');
    
    expect(result.status).toBe(ParseStatus.SUCCESS);
    expect(result.message).toBeUndefined();
  });

  it('应该在解析失败时返回 FAIL 状态和错误信息', async () => {
    const errorMessage = 'Syntax error in mermaid diagram';
    
    mockExec.mockImplementation((command: string, callback: Function) => {
      const error = new Error(errorMessage);
      callback(error, '', 'Error: ' + errorMessage);
      return {} as any;
    });

    const result = await parseMermaid('invalid.mmd', 'output.svg');
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).toContain(errorMessage);
  });

  it('应该过滤掉 npm warn 消息', async () => {
    const stderr = `npm warn deprecated package@1.0.0
npm WARN old lockfile
Error: Parse error on line 1:
Unexpected token`;
    
    mockExec.mockImplementation((command: string, callback: Function) => {
      const error = new Error('Command failed');
      callback(error, '', stderr);
      return {} as any;
    });

    const result = await parseMermaid('test.mmd', 'test.svg');
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).not.toContain('npm warn');
    expect(result.message).not.toContain('npm WARN');
    expect(result.message).toContain('Error: Parse error on line 1:');
  });

  it('应该正确处理堆栈跟踪信息', async () => {
    const stderr = `Error: Invalid syntax
    at Parser.parse (/path/to/parser.js:123:45)
    at async processFile (/path/to/process.js:67:89)`;
    
    mockExec.mockImplementation((command: string, callback: Function) => {
      const error = new Error('Command failed');
      callback(error, '', stderr);
      return {} as any;
    });

    const result = await parseMermaid('test.mmd', 'test.svg');
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).toBe('Error: Invalid syntax');
    expect(result.message).not.toContain('at Parser.parse');
  });

  it('应该使用默认的文件名参数', async () => {
    mockExec.mockImplementation((command: string, callback: Function) => {
      expect(command).toContain('input.mmd');
      expect(command).toContain('output.svg');
      callback(null, '', '');
      return {} as any;
    });

    await parseMermaid();
    
    expect(mockExec).toHaveBeenCalledWith(
      expect.stringContaining('input.mmd'),
      expect.any(Function)
    );
  });

  it('应该使用自定义的文件名参数', async () => {
    const customInput = 'custom-input.mmd';
    const customOutput = 'custom-output.svg';
    
    mockExec.mockImplementation((command: string, callback: Function) => {
      expect(command).toContain(customInput);
      expect(command).toContain(customOutput);
      callback(null, '', '');
      return {} as any;
    });

    await parseMermaid(customInput, customOutput);
    
    expect(mockExec).toHaveBeenCalledWith(
      expect.stringContaining(customInput),
      expect.any(Function)
    );
  });

  it('应该正确构建 mmdc 命令', async () => {
    mockExec.mockImplementation((command: string, callback: Function) => {
      expect(command).toMatch(/npx mmdc -i .+ -o .+/);
      callback(null, '', '');
      return {} as any;
    });

    await parseMermaid('test.mmd', 'test.svg');
    
    expect(mockExec).toHaveBeenCalled();
  });

  it('应该处理空的错误输出', async () => {
    mockExec.mockImplementation((command: string, callback: Function) => {
      const error = new Error('Unknown error');
      callback(error, '', '');
      return {} as any;
    });

    const result = await parseMermaid('test.mmd', 'test.svg');
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).toBe('Unknown error');
  });

  it('应该处理只有 stderr 的情况', async () => {
    const stderrMessage = 'Error: Mermaid parsing failed';
    
    mockExec.mockImplementation((command: string, callback: Function) => {
      const error = new Error();
      callback(error, '', stderrMessage);
      return {} as any;
    });

    const result = await parseMermaid('test.mmd', 'test.svg');
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).toBe(stderrMessage);
  });

  it('应该处理复杂的错误输出过滤', async () => {
    const complexStderr = `npm warn deprecated package@1.0.0: This package is deprecated
npm WARN old lockfile The package-lock.json file was created with an old version
Error: Parse error on line 5:
...graph TD
-----------^
Expecting 'NEWLINE', 'SPACE', 'GRAPH', got 'MINUS'
    at Parser.parseError (/node_modules/mermaid/dist/mermaid.js:1234:56)
    at Parser.parse (/node_modules/mermaid/dist/mermaid.js:2345:67)
    at async generateSVG (/node_modules/@mermaid-js/mermaid-cli/src/index.js:123:45)`;
    
    mockExec.mockImplementation((command: string, callback: Function) => {
      const error = new Error('Command failed');
      callback(error, '', complexStderr);
      return {} as any;
    });

    const result = await parseMermaid('test.mmd', 'test.svg');
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).toContain('Error: Parse error on line 5:');
    expect(result.message).toContain("Expecting 'NEWLINE', 'SPACE', 'GRAPH', got 'MINUS'");
    expect(result.message).not.toContain('npm warn');
    expect(result.message).not.toContain('at Parser.parseError');
  });
});

describe('ParseStatus 枚举', () => {
  it('应该有正确的枚举值', () => {
    expect(ParseStatus.SUCCESS).toBe(0);
    expect(ParseStatus.FAIL).toBe(1);
  });
});

describe('ParseResult 接口', () => {
  it('应该支持成功结果', () => {
    const result: ParseResult = {
      status: ParseStatus.SUCCESS
    };
    
    expect(result.status).toBe(ParseStatus.SUCCESS);
    expect(result.message).toBeUndefined();
  });

  it('应该支持失败结果', () => {
    const result: ParseResult = {
      status: ParseStatus.FAIL,
      message: 'Test error message'
    };
    
    expect(result.status).toBe(ParseStatus.FAIL);
    expect(result.message).toBe('Test error message');
  });
});