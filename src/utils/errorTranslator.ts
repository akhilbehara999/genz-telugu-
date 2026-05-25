const ERROR_TRANSLATIONS: Record<string, string> = {
  'SyntaxError': 'Syntax Error ra mama! Code lo spelling mistake undemo chudu.',
  'NameError': 'Name Error ra! Variable peru correct ga rasavo, leda define cheyaledo chudu.',
  'TypeError': 'Type Error ra! Data type correct ledu, check chusi chudu.',
  'IndentationError': 'Indentation Error ra mama! Spaces/tabs correct ga pettavo chudu.',
  'ValueError': 'Value Error ra! Value correct ledu, check chusi chudu.',
  'KeyError': 'Key Error ra! Dictionary lo key ledu, correct key tho try chudu.',
  'IndexError': 'Index Error ra! List lo index range daatindi.',
  'ZeroDivisionError': 'Zero Division Error ra! Zero tho divide cheyaledu ra mama.',
  'AttributeError': 'Attribute Error ra! Aa method/property aa type ki ledu.',
  'ImportError': 'Import Error ra! Module import avvaledu.',
  'ModuleNotFoundError': 'Module Not Found ra! Aa module Pyodide lo undemo chudu.',
  'FileNotFoundError': 'File Not Found ra! Browser lo files access cheyalem.',
  'TypeError: unsupported operand': 'Type mismatch ra! Rendu different types ni operate cheyaledu.',
  'unexpected indent': 'Unexpected indent ra! Extra spaces undemo chudu.',
  'expected an indented block': 'Indented block kavali ra! Colon tarvatha indent ivvu.',
  'invalid syntax': 'Invalid syntax ra! Code correct ga rasavo chudu.',
  'EOL while scanning string literal': 'String correct ga close cheyaledu ra! Quotes check chudu.',
  'unexpected EOF while parsing': 'Code incomplete ra! Brackets/parentheses close chesavemo chudu.',
};

export function translateErrorToTelugu(errorMessage: string): string {
  for (const [key, translation] of Object.entries(ERROR_TRANSLATIONS)) {
    if (errorMessage.includes(key)) {
      return `${translation}\n\nOriginal: ${errorMessage}`;
    }
  }
  return `Error ra mama! 🤔\n\n${errorMessage}`;
}
