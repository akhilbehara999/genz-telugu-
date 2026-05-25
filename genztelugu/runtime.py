"""GenZ Telugu runtime — executes translated Python code."""

import sys
import os
import tempfile
import subprocess
from genztelugu.errors import translate_error


def run_code(python_code: str, working_dir: str | None = None) -> tuple[str, bool]:
    """Execute translated Python code and return output.

    Args:
        python_code: Valid Python source code to execute.
        working_dir: Directory to run the code in. Defaults to current directory.

    Returns:
        Tuple of (output_string, success_boolean).
    """
    cwd = working_dir or os.getcwd()

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".py",
        encoding="utf-8",
        delete=False,
        dir=cwd,
    ) as tmp:
        tmp.write("# -*- coding: utf-8 -*-\n")
        tmp.write(python_code)
        tmp_path = tmp.name

    try:
        env = os.environ.copy()
        env["PYTHONUTF8"] = "1"

        result = subprocess.run(
            [sys.executable, tmp_path],
            capture_output=True,
            text=True,
            cwd=cwd,
            env=env,
            timeout=30,
        )

        output = result.stdout
        success = result.returncode == 0

        if result.stderr:
            if success:
                output += result.stderr
            else:
                output += translate_error(result.stderr.strip())

        return output, success

    except subprocess.TimeoutExpired:
        return "Error ra mama! Code 30 seconds kante ekkuva time teesukundi. ⏰", False
    except Exception as e:
        return translate_error(str(e)), False
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
