export const KEYWORDS: Record<string, string> = {
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
  leka: 'or',
  kaadhu: 'not',
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

export const REVERSE_KEYWORDS: Record<string, string> = Object.fromEntries(
  Object.entries(KEYWORDS).map(([gz, py]) => [py, gz])
);

/**
 * Translates GenZ Telugu code to standard Python.
 * Uses a token-based regex to avoid translating keywords inside strings and comments.
 */
export function translateToPython(code: string): string {
  const tokenRegex = /(?<tripleString>"""[\s\S]*?"""|'''[\s\S]*?''')|(?<string>"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|(?<comment>#[^\r\n]*)|(?<identifier>[a-zA-Z_][a-zA-Z0-9_]*)|(?<other>[\s\S])/g;

  return code.replace(tokenRegex, (...args) => {
    const groups = args[args.length - 1] as Record<string, string>;
    
    if (groups.identifier) {
      const lowerId = groups.identifier;
      if (KEYWORDS[lowerId]) {
        return KEYWORDS[lowerId];
      }
    }
    return args[0];
  });
}

/**
 * Translates standard Python code back to GenZ Telugu.
 * Uses a token-based regex to avoid translating keywords inside strings and comments.
 */
export function translateToGenZTelugu(code: string): string {
  const tokenRegex = /(?<tripleString>"""[\s\S]*?"""|'''[\s\S]*?''')|(?<string>"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|(?<comment>#[^\r\n]*)|(?<identifier>[a-zA-Z_][a-zA-Z0-9_]*)|(?<other>[\s\S])/g;

  return code.replace(tokenRegex, (...args) => {
    const groups = args[args.length - 1] as Record<string, string>;
    
    if (groups.identifier) {
      if (REVERSE_KEYWORDS[groups.identifier]) {
        return REVERSE_KEYWORDS[groups.identifier];
      }
    }
    return args[0];
  });
}
