"""Friendly Telugu error message translations."""

_ERROR_TRANSLATIONS: dict[str, str] = {
    "SyntaxError": "Syntax Error ra mama! Code lo spelling mistake undemo chudu.",
    "NameError": "Name Error ra! Variable peru correct ga rasavo, leda define cheyaledo chudu.",
    "TypeError": "Type Error ra! Data type correct ledu, check chusi chudu.",
    "IndentationError": "Indentation Error ra mama! Spaces/tabs correct ga pettavo chudu.",
    "ValueError": "Value Error ra! Value correct ledu, check chusi chudu.",
    "KeyError": "Key Error ra! Dictionary lo key ledu, correct key tho try chudu.",
    "IndexError": "Index Error ra! List lo index range daatindi.",
    "ZeroDivisionError": "Zero Division Error ra! Zero tho divide cheyaledu ra mama.",
    "AttributeError": "Attribute Error ra! Aa method/property aa type ki ledu.",
    "ImportError": "Import Error ra! Module import avvaledu.",
    "ModuleNotFoundError": "Module Not Found ra! Aa module install cheyaledo chudu.",
    "FileNotFoundError": "File Not Found ra! File path correct ga undemo chudu.",
    "TypeError: unsupported operand": "Type mismatch ra! Rendu different types ni operate cheyaledu.",
    "unexpected indent": "Unexpected indent ra! Extra spaces undemo chudu.",
    "expected an indented block": "Indented block kavali ra! Colon tarvatha indent ivvu.",
    "invalid syntax": "Invalid syntax ra! Code correct ga rasavo chudu.",
    "EOL while scanning string literal": "String correct ga close cheyaledu ra! Quotes check chudu.",
    "unexpected EOF while parsing": "Code incomplete ra! Brackets/parentheses close chesavemo chudu.",
}


def translate_error(error_message: str) -> str:
    """Translate a Python error message to friendly Telugu.

    Args:
        error_message: Original Python error/traceback message.

    Returns:
        Friendly Telugu error message with original appended.
    """
    for key, translation in _ERROR_TRANSLATIONS.items():
        if key in error_message:
            return f"{translation}\n\nOriginal: {error_message}"
    return f"Error ra mama! 🤔\n\n{error_message}"
