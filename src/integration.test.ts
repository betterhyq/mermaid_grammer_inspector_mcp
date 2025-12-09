/**
 * 集成测试用例
 * 测试整个 Mermaid 语法检查器的端到端功能
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkMermaid } from './check';
import { ParseStatus } from './parse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Mermaid 语法检查器集成测试', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');

  beforeEach(() => {
    // 清理可能存在的临时文件
    const tempFiles = ['input.mmd', 'output.svg'];
    tempFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });

  afterEach(() => {
    // 清理测试产生的临时文件
    const tempFiles = ['input.mmd', 'output.svg'];
    tempFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });

  describe('有效的 Mermaid 图表测试', () => {
    it('应该成功验证流程图', async () => {
      const rightMmdPath = path.join(fixturesDir, 'right.mmd');
      const mermaidContent = fs.readFileSync(rightMmdPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
      expect(result.message).toBeUndefined();
    });

    it('应该成功验证序列图', async () => {
      const sequenceDiagramPath = path.join(fixturesDir, 'sequence-diagram.mmd');
      const mermaidContent = fs.readFileSync(sequenceDiagramPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
      expect(result.message).toBeUndefined();
    });

    it('应该成功验证类图', async () => {
      const classDiagramPath = path.join(fixturesDir, 'class-diagram.mmd');
      const mermaidContent = fs.readFileSync(classDiagramPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
      expect(result.message).toBeUndefined();
    });

    it('应该成功验证甘特图', async () => {
      const ganttChartPath = path.join(fixturesDir, 'gantt-chart.mmd');
      const mermaidContent = fs.readFileSync(ganttChartPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
      expect(result.message).toBeUndefined();
    });

    it('应该成功验证状态图', async () => {
      const stateDiagramPath = path.join(fixturesDir, 'state-diagram.mmd');
      const mermaidContent = fs.readFileSync(stateDiagramPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
      expect(result.message).toBeUndefined();
    });

    it('应该成功验证 ER 图', async () => {
      const erDiagramPath = path.join(fixturesDir, 'er-diagram.mmd');
      const mermaidContent = fs.readFileSync(erDiagramPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
      expect(result.message).toBeUndefined();
    });
  });

  describe('无效的 Mermaid 图表测试', () => {
    it('应该检测到语法错误的流程图', async () => {
      const wrongMmdPath = path.join(fixturesDir, 'wrong.mmd');
      const mermaidContent = fs.readFileSync(wrongMmdPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.FAIL);
      expect(result.message).toBeDefined();
      expect(typeof result.message).toBe('string');
    });

    it('应该检测到语法错误的图表', async () => {
      const syntaxErrorPath = path.join(fixturesDir, 'syntax-error.mmd');
      const mermaidContent = fs.readFileSync(syntaxErrorPath, 'utf-8');

      const result = await checkMermaid(mermaidContent);

      expect(result.status).toBe(ParseStatus.FAIL);
      expect(result.message).toBeDefined();
      expect(typeof result.message).toBe('string');
    });

    it('应该处理空内容', async () => {
      const result = await checkMermaid('');

      expect(result.status).toBe(ParseStatus.FAIL);
      expect(result.message).toBeDefined();
    });

    it('应该处理无效的图表类型', async () => {
      const invalidContent = `
invalidDiagram
    A --> B
    B --> C
      `;

      const result = await checkMermaid(invalidContent);

      expect(result.status).toBe(ParseStatus.FAIL);
      expect(result.message).toBeDefined();
    });
  });

  describe('边界情况测试', () => {
    it('应该处理非常长的图表内容', async () => {
      let longContent = 'flowchart TD\n';
      for (let i = 0; i < 100; i++) {
        longContent += `    A${i}[Node ${i}] --> A${i + 1}[Node ${i + 1}]\n`;
      }

      const result = await checkMermaid(longContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
    });

    it('应该处理包含特殊字符的内容', async () => {
      const specialContent = `
flowchart TD
    A["包含中文字符"] --> B["emoji 🚀💻"]
    B --> C["简单测试"]
    C --> D["结束节点"]
      `;

      const result = await checkMermaid(specialContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
    });

    it('应该处理只有空白字符的内容', async () => {
      const whitespaceContent = '   \n\t\r\n   \t   \n';

      const result = await checkMermaid(whitespaceContent);

      expect(result.status).toBe(ParseStatus.FAIL);
      expect(result.message).toBeDefined();
    });

    it('应该处理包含注释的图表', async () => {
      const commentContent = `
%% 这是一个注释
flowchart TD
    %% 开始节点
    A[开始] --> B{判断}
    %% 分支处理
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    %% 结束
    C --> E[结束]
    D --> E
      `;

      const result = await checkMermaid(commentContent);

      expect(result.status).toBe(ParseStatus.SUCCESS);
    });
  });

  describe('文件操作测试', () => {
    it('应该创建和清理临时文件', async () => {
      const inputFilePath = path.join(__dirname, 'input.mmd');
      const outputFilePath = path.join(__dirname, 'output.svg');

      // 确保文件不存在
      expect(fs.existsSync(inputFilePath)).toBe(false);
      expect(fs.existsSync(outputFilePath)).toBe(false);

      const testContent = `
flowchart TD
    A --> B
      `;

      await checkMermaid(testContent);

      // 检查临时输入文件是否被创建
      expect(fs.existsSync(inputFilePath)).toBe(true);

      // 验证文件内容
      const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
      expect(fileContent).toBe(testContent);
    });

    it('应该正确处理文件编码', async () => {
      const unicodeContent = `
flowchart TD
    A["测试中文 🌟"] --> B["Ελληνικά αβγ"]
    B --> C["العربية ١٢٣"]
    C --> D["русский язык"]
      `;

      const result = await checkMermaid(unicodeContent);

      const inputFilePath = path.join(__dirname, 'input.mmd');
      const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
      
      expect(fileContent).toBe(unicodeContent);
      expect(result.status).toBe(ParseStatus.SUCCESS);
    });
  });

  describe('性能测试', () => {
    it('应该在合理时间内完成检查', async () => {
      const startTime = Date.now();
      
      const testContent = `
flowchart TD
    A[开始] --> B{检查条件}
    B -->|满足| C[执行操作]
    B -->|不满足| D[跳过操作]
    C --> E[记录日志]
    D --> E
    E --> F[结束]
      `;

      await checkMermaid(testContent);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // 检查应该在5秒内完成
      expect(duration).toBeLessThan(5000);
    });
  });
});