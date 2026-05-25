import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const KEYWORDS: Record<string, string> = {
  cheppu: 'print',
  okavela: 'if',
  lekapothe_okavela: 'elif',
  lekapothe: 'else',
  kosam: 'for',
  lo: 'in',
  paridhi: 'range',
  pani: 'def',
  tirigi: 'return',
  nijam: 'True',
  abaddam: 'False',
  yevaru: 'None',
  antha_varaku: 'while',
  vadhilesi: 'break',
  konasagu: 'continue',
  mariyu: 'and',
  leda: 'or',
  kadhu: 'not',
  adugu: 'input',
  podavu: 'len',
  sankhya: 'int',
  padham: 'str',
  bhinna_sankhya: 'float',
  motha_sankhya: 'sum',
  vinu: 'import',
  gumpu: 'list',
  kurcho: 'pass',
  bokka: 'Exception',
};

const REVERSE_KEYWORDS: Record<string, string> = Object.fromEntries(
  Object.entries(KEYWORDS).map(([gz, py]) => [py, gz])
);

const TOKEN_REGEX = /(?<tripleString>"""[\s\S]*?"""|'''[\s\S]*?''')|(?<string>"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|(?<comment>#[^\r\n]*)|(?<identifier>[a-zA-Z_][a-zA-Z0-9_]*)|(?<other>[\s\S])/g;

function translateToPython(code: string): string {
  return code.replace(TOKEN_REGEX, (...args) => {
    const groups = args[args.length - 1] as Record<string, string>;
    if (groups.identifier && KEYWORDS[groups.identifier]) {
      return KEYWORDS[groups.identifier];
    }
    return args[0];
  });
}

function translateToGenZTelugu(code: string): string {
  return code.replace(TOKEN_REGEX, (...args) => {
    const groups = args[args.length - 1] as Record<string, string>;
    if (groups.identifier && REVERSE_KEYWORDS[groups.identifier]) {
      return REVERSE_KEYWORDS[groups.identifier];
    }
    return args[0];
  });
}

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('GenZ Telugu');
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('genztelugu');

  const pythonPath = vscode.workspace.getConfiguration('genztelugu').get<string>('pythonPath') || 'python';

  function getPythonPath(): string {
    return vscode.workspace.getConfiguration('genztelugu').get<string>('pythonPath') || pythonPath;
  }

  const runDisposable = vscode.commands.registerCommand('genztelugu.runFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor!');
      return;
    }

    await editor.document.save();

    const document = editor.document;
    const code = document.getText();
    const pythonCode = translateToPython(code);

    outputChannel.clear();
    outputChannel.show(true);
    outputChannel.appendLine('▶ Running GenZ Telugu...\n');

    const autoTranslate = vscode.workspace.getConfiguration('genztelugu').get<boolean>('autoTranslate');
    if (autoTranslate) {
      outputChannel.appendLine('─── Translated Python ───');
      outputChannel.appendLine(pythonCode);
      outputChannel.appendLine('─────────────────────────\n');
    }

    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `genzt_${Date.now()}.py`);

    fs.writeFileSync(tempFile, '# -*- coding: utf-8 -*-\n' + pythonCode, 'utf-8');

    exec(`"${getPythonPath()}" "${tempFile}"`, {
      cwd: path.dirname(document.fileName),
      env: { ...process.env, PYTHONUTF8: '1' },
    }, (error, stdout, stderr) => {
      if (stdout) outputChannel.appendLine(stdout);
      if (stderr) {
        if (error) {
          outputChannel.appendLine('✗ Error:\n' + stderr);
          addDiagnostics(document, stderr);
        } else {
          outputChannel.appendLine(stderr);
        }
      }
      if (error) {
        outputChannel.appendLine(`\nExit code: ${error.code}`);
        vscode.window.showErrorMessage(`GenZ Telugu: Execution failed (exit ${error.code})`);
      } else {
        outputChannel.appendLine('\n✓ Done!');
      }

      try { fs.unlinkSync(tempFile); } catch { /* ignore */ }
    });
  });

  const translateDisposable = vscode.commands.registerCommand('genztelugu.translateFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor!');
      return;
    }

    const code = editor.document.getText();
    const pythonCode = translateToPython(code);

    const doc = await vscode.workspace.openTextDocument({
      language: 'python',
      content: pythonCode,
    });
    await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside, preview: true });
  });

  const keywordsDisposable = vscode.commands.registerCommand('genztelugu.showKeywords', async () => {
    const groups: Record<string, string[]> = {
      'Basic': ['cheppu', 'adugu', 'podavu'],
      'Conditionals': ['okavela', 'lekapothe_okavela', 'lekapothe'],
      'Loops': ['kosam', 'lo', 'paridhi', 'antha_varaku'],
      'Functions': ['pani', 'tirigi'],
      'Values': ['nijam', 'abaddam', 'yevaru'],
      'Control': ['vadhilesi', 'konasagu', 'kurcho'],
      'Operators': ['mariyu', 'leda', 'kadhu'],
      'Types': ['sankhya', 'padham', 'bhinna_sankhya', 'gumpu'],
      'Other': ['vinu', 'bokka', 'motha_sankhya'],
    };

    let md = '# GenZ Telugu Keywords\n\n';
    for (const [group, kws] of Object.entries(groups)) {
      md += `## ${group}\n\n| GenZ Telugu | Python |\n|---|---|\n`;
      for (const kw of kws) {
        md += `| \`${kw}\` | \`${KEYWORDS[kw]}\` |\n`;
      }
      md += '\n';
    }

    const doc = await vscode.workspace.openTextDocument({
      language: 'markdown',
      content: md,
    });
    await vscode.window.showTextDocument(doc);
  });

  function addDiagnostics(document: vscode.TextDocument, errorOutput: string) {
    const diagnostics: vscode.Diagnostic[] = [];
    const lines = errorOutput.split('\n');

    for (const line of lines) {
      const match = line.match(/line (\d+)/);
      if (match) {
        const lineNum = parseInt(match[1], 10) - 1;
        if (lineNum >= 0 && lineNum < document.lineCount) {
          const docLine = document.lineAt(lineNum);
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, 0, lineNum, docLine.text.length),
            errorOutput.trim().substring(0, 200),
            vscode.DiagnosticSeverity.Error
          );
          diagnostics.push(diagnostic);
        }
      }
    }

    diagnosticCollection.set(document.uri, diagnostics);
  }

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    'genztelugu',
    {
      provideCompletionItems(_document, _position) {
        return Object.keys(KEYWORDS).map((keyword) => {
          const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
          item.detail = `→ ${KEYWORDS[keyword]}`;
          item.documentation = new vscode.MarkdownString(
            `**${keyword}** translates to \`${KEYWORDS[keyword]}\` in Python`
          );
          return item;
        });
      },
    },
    ''
  );

  const hoverProvider = vscode.languages.registerHoverProvider(
    'genztelugu',
    {
      provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position, /[a-zA-Z_]\w*/);
        if (!range) return undefined;

        const word = document.getText(range);
        if (KEYWORDS[word]) {
          return new vscode.Hover(
            new vscode.MarkdownString(
              `**${word}** → \`${KEYWORDS[word]}\`\n\n*GenZ Telugu keyword*`
            )
          );
        }
        return undefined;
      },
    }
  );

  const reverseHoverProvider = vscode.languages.registerHoverProvider(
    'python',
    {
      provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position, /[a-zA-Z_]\w*/);
        if (!range) return undefined;

        const word = document.getText(range);
        if (REVERSE_KEYWORDS[word]) {
          return new vscode.Hover(
            new vscode.MarkdownString(
              `**${word}** → \`${REVERSE_KEYWORDS[word]}\` in GenZ Telugu`
            )
          );
        }
        return undefined;
      },
    }
  );

  context.subscriptions.push(
    runDisposable,
    translateDisposable,
    keywordsDisposable,
    completionProvider,
    hoverProvider,
    reverseHoverProvider,
    diagnosticCollection,
    outputChannel
  );
}

export function deactivate() {}
