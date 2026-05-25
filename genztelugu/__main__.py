"""GenZ Telugu CLI entry point.

Usage:
    genz <file.gzt>          Translate and run
    genz translate <file>    Show translated Python
    genz keywords            Show keyword reference
    genz repl                Interactive shell
    genz --version           Show version
    genz --help              Show help
"""

import sys
import os
import code as code_module

from genztelugu import __version__
from genztelugu.translator import translate_to_python
from genztelugu.runtime import run_code
from genztelugu.utils import (
    print_banner,
    print_keywords,
    validate_gzt_file,
    read_file,
    SEPARATOR,
)


def cmd_run(filepath: str) -> None:
    """Translate and execute a .gzt file."""
    error = validate_gzt_file(filepath)
    if error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)

    source = read_file(filepath)
    python_code = translate_to_python(source)
    output, success = run_code(python_code, working_dir=os.path.dirname(os.path.abspath(filepath)))

    print(f"▶ Running: {filepath}")
    print(SEPARATOR)
    print(output)
    print(SEPARATOR)

    if success:
        print("✓ Done!")
    else:
        print("✗ Error occurred", file=sys.stderr)
        sys.exit(1)


def cmd_translate(filepath: str) -> None:
    """Show translated Python code."""
    error = validate_gzt_file(filepath)
    if error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)

    source = read_file(filepath)
    python_code = translate_to_python(source)

    print(f"▶ Translated Python: {filepath}\n")
    print(SEPARATOR)
    print(python_code)
    print(SEPARATOR)


def cmd_repl() -> None:
    """Start an interactive GenZ Telugu REPL."""
    print("GenZ Telugu REPL  (type 'exit' to quit, 'run' to execute)\n")

    buffer: list[str] = []

    def _run_buffer() -> None:
        source = "\n".join(buffer)
        python_code = translate_to_python(source)
        print(f"\n▶ Translated:")
        print(python_code)
        print(SEPARATOR)

        output, success = run_code(python_code)
        print(output)
        print(SEPARATOR)
        buffer.clear()

    def _prompt() -> str:
        if buffer:
            return "... "
        return "genz> "

    try:
        while True:
            try:
                line = input(_prompt())
            except EOFError:
                print()
                break

            line = line.strip()

            if line in ("exit", ".exit", "quit"):
                print("Bye ra mama! 👋")
                break

            if line in ("run", ".run"):
                if not buffer:
                    print("Nothing to run!")
                    continue
                _run_buffer()
                print()
                continue

            if line in ("clear", ".clear"):
                buffer.clear()
                print()
                continue

            if line == "help":
                print("""
  run   — Execute current code
  clear — Clear buffer
  exit  — Quit REPL
  help  — Show this help
""")
                continue

            buffer.append(line)

    except KeyboardInterrupt:
        print("\nBye ra mama! 👋")


def show_help() -> None:
    """Print help message."""
    print(f"""
Usage: genz <command> [file]

Commands:
  run <file.gzt>          Translate and run a GenZ Telugu file
  translate <file.gzt>    Show translated Python code
  keywords                Show all available keywords
  repl                    Interactive GenZ Telugu shell
  --version               Show version
  --help                  Show this help

Examples:
  genz hello.gzt
  genz run calculator.gzt
  genz translate program.gzt
  genz keywords
  genz repl
""")


def main() -> None:
    """CLI entry point."""
    args = sys.argv[1:]

    if not args or args[0] in ("--help", "-h"):
        print_banner()
        show_help()
        return

    if args[0] in ("--version", "-v"):
        print(f"genz-telugu v{__version__}")
        return

    print_banner()

    command = args[0]

    if command in ("run", "r"):
        if len(args) < 2:
            print("Usage: genz run <file.gzt>", file=sys.stderr)
            sys.exit(1)
        cmd_run(args[1])

    elif command in ("translate", "transpile", "t"):
        if len(args) < 2:
            print("Usage: genz translate <file.gzt>", file=sys.stderr)
            sys.exit(1)
        cmd_translate(args[1])

    elif command in ("keywords", "kw", "k"):
        print_keywords()

    elif command in ("repl",):
        cmd_repl()

    else:
        if os.path.exists(command) and command.endswith(".gzt"):
            cmd_run(command)
        else:
            print(f"Unknown command: {command}", file=sys.stderr)
            show_help()
            sys.exit(1)


if __name__ == "__main__":
    main()
