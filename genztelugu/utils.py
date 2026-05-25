"""Utility functions for GenZ Telugu."""

import os
import sys

# Ensure UTF-8 output on all platforms
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")
if sys.stderr.encoding != "utf-8":
    sys.stderr.reconfigure(encoding="utf-8")

from genztelugu.keywords import KEYWORD_GROUPS, KEYWORDS


BANNER = """
  GenZ Telugu v1.0.0
  Code like you chat. Python powered.
  Telugu flavored.
"""

SEPARATOR = "-" * 40


def print_banner() -> None:
    """Print the GenZ Telugu banner."""
    print(BANNER)


def print_keywords() -> None:
    """Print all available keywords grouped by category."""
    print("\nGenZ Telugu Keywords:\n")

    for group, keywords in KEYWORD_GROUPS.items():
        print(f"  {group}:")
        for kw in keywords:
            py = KEYWORDS[kw]
            print(f"    {kw:<22} → {py}")
        print()


def validate_gzt_file(filepath: str) -> str | None:
    """Validate that a file exists and has .gzt extension.

    Args:
        filepath: Path to the file.

    Returns:
        Error message string if invalid, None if valid.
    """
    if not os.path.exists(filepath):
        return f"File not found: {filepath}"
    if not filepath.endswith(".gzt"):
        return f"Expected .gzt file, got: {filepath}"
    return None


def read_file(filepath: str) -> str:
    """Read a file with UTF-8 encoding.

    Args:
        filepath: Path to the file.

    Returns:
        File contents as string.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()
