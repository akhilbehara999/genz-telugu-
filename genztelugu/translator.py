"""GenZ Telugu translation engine.

Translates GenZ Telugu syntax to valid Python and vice versa.
Uses token-based parsing to avoid replacing keywords inside strings and comments.
"""

import re
from genztelugu.keywords import KEYWORDS, REVERSE_KEYWORDS

_TOKEN_PATTERN = re.compile(
    r'(?P<triple_string>"""[\s\S]*?"""|\'\'\'[\s\S]*?\'\'\')'
    r'|(?P<string>"[^"\\]*(?:\\.[^"\\]*)*"|\'[^\'\\]*(?:\\.[^\'\\]*)*\')'
    r'|(?P<comment>#[^\r\n]*)'
    r'|(?P<identifier>[a-zA-Z_][a-zA-Z0-9_]*)'
    r'|(?P<other>[\s\S])'
)


def translate_to_python(code: str) -> str:
    """Translate GenZ Telugu code to valid Python.

    Args:
        code: Source code written in GenZ Telugu syntax.

    Returns:
        Valid Python code string.
    """

    def _replace(match: re.Match[str]) -> str:
        if match.group("identifier"):
            identifier = match.group("identifier")
            if identifier in KEYWORDS:
                return KEYWORDS[identifier]
        return match.group(0)

    return _TOKEN_PATTERN.sub(_replace, code)


def translate_to_genztelugu(code: str) -> str:
    """Translate Python code to GenZ Telugu syntax.

    Args:
        code: Valid Python source code.

    Returns:
        Code with Python keywords replaced by GenZ Telugu equivalents.
    """

    def _replace(match: re.Match[str]) -> str:
        if match.group("identifier"):
            identifier = match.group("identifier")
            if identifier in REVERSE_KEYWORDS:
                return REVERSE_KEYWORDS[identifier]
        return match.group(0)

    return _TOKEN_PATTERN.sub(_replace, code)
