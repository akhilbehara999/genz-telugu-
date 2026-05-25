"""GenZ Telugu keyword mappings."""

KEYWORDS: dict[str, str] = {
    "cheppu": "print",
    "okavela": "if",
    "lekapothe_okavela": "elif",
    "lekapothe": "else",
    "kosam": "for",
    "lo": "in",
    "paridhi": "range",
    "pani": "def",
    "tirigi": "return",
    "nijam": "True",
    "abaddam": "False",
    "yevaru": "None",
    "antha_varaku": "while",
    "vadhilesi": "break",
    "konasagu": "continue",
    "mariyu": "and",
    "leda": "or",
    "kadhu": "not",
    "adugu": "input",
    "podavu": "len",
    "sankhya": "int",
    "padham": "str",
    "bhinna_sankhya": "float",
    "motha_sankhya": "sum",
    "vinu": "import",
    "gumpu": "list",
    "kurcho": "pass",
    "bokka": "Exception",
}

REVERSE_KEYWORDS: dict[str, str] = {v: k for k, v in KEYWORDS.items()}

KEYWORD_GROUPS: dict[str, list[str]] = {
    "Basic": ["cheppu", "adugu", "podavu"],
    "Conditionals": ["okavela", "lekapothe_okavela", "lekapothe"],
    "Loops": ["kosam", "lo", "paridhi", "antha_varaku"],
    "Functions": ["pani", "tirigi"],
    "Values": ["nijam", "abaddam", "yevaru"],
    "Control": ["vadhilesi", "konasagu", "kurcho"],
    "Operators": ["mariyu", "leda", "kadhu"],
    "Types": ["sankhya", "padham", "bhinna_sankhya", "gumpu"],
    "Other": ["vinu", "bokka", "motha_sankhya"],
}
