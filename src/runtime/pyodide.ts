import { loadPyodide as loadPyodideLib, type PyodideInterface } from 'pyodide';
import type { OutputLine } from '../types';
import { translateErrorToTelugu } from '../utils/errorTranslator';

let pyodideInstance: PyodideInterface | null = null;
let loadingPromise: Promise<PyodideInterface> | null = null;

export function getPyodideStatus(): 'idle' | 'loading' | 'ready' {
  if (pyodideInstance) return 'ready';
  if (loadingPromise) return 'loading';
  return 'idle';
}

export async function loadPyodide(
  onProgress?: (msg: string) => void
): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    onProgress?.('Python engine loading...');

    pyodideInstance = await loadPyodideLib({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/',
    });

    pyodideInstance.setStdout({
      batched: (msg: string) => {
        window.dispatchEvent(
          new CustomEvent('pyodide-output', {
            detail: { type: 'stdout' as const, content: msg },
          })
        );
      },
    });

    pyodideInstance.setStderr({
      batched: (msg: string) => {
        window.dispatchEvent(
          new CustomEvent('pyodide-output', {
            detail: { type: 'stderr' as const, content: msg },
          })
        );
      },
    });

    onProgress?.('Python engine ready! 🔥');
    return pyodideInstance;
  })();

  return loadingPromise;
}

export async function runPythonCode(
  code: string
): Promise<{ output: OutputLine[]; success: boolean }> {
  const pyodide = await loadPyodide();
  const output: OutputLine[] = [];

  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    output.push({
      type: detail.type,
      content: detail.content,
      timestamp: Date.now(),
    });
  };

  window.addEventListener('pyodide-output', handler);

  try {
    await pyodide.runPythonAsync(code);
    return { output, success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const friendlyMessage = translateErrorToTelugu(message);
    output.push({
      type: 'error',
      content: friendlyMessage,
      timestamp: Date.now(),
    });
    return { output, success: false };
  } finally {
    window.removeEventListener('pyodide-output', handler);
  }
}
