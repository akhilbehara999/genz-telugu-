# GenZ Telugu 🚀

<p align="center">
  <img src="vscode-extension/images/icon.png" width="128" height="128" alt="GenZ Telugu Logo" />
</p>

<p align="center">
  <strong>Code like you chat. Python powered, Telugu flavored. 🔥</strong>
</p>

<p align="center">
  <a href="https://github.com/akhilbehara999/genz-telugu-/actions/workflows/ci.yml"><img src="https://github.com/akhilbehara999/genz-telugu-/actions/workflows/ci.yml/badge.svg" alt="Build Status" /></a>
  <a href="https://pypi.org/project/genz-telugu/"><img src="https://img.shields.io/badge/PyPI-Coming%20Soon-blue" alt="PyPI Status" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=genz-telugu.genz-telugu-lang"><img src="https://vsmarketplacebadges.dev/version/genz-telugu.genz-telugu-lang.svg" alt="VS Code Extension" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=genz-telugu.genz-telugu-lang"><img src="https://vsmarketplacebadges.dev/installs/genz-telugu.genz-telugu-lang.svg" alt="Installs" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=genz-telugu.genz-telugu-lang"><img src="https://vsmarketplacebadges.dev/rating/genz-telugu.genz-telugu-lang.svg" alt="Rating" /></a>
  <a href="https://github.com/akhilbehara999/genz-telugu-/blob/main/LICENSE"><img src="https://img.shields.io/github/license/akhilbehara999/genz-telugu-.svg" alt="License" /></a>
</p>

---

## 📌 Introduction

**GenZ Telugu** is a Telugu-inspired, student-friendly programming playground and language model. It removes the language barrier for coding beginners by enabling them to write fully functional Python programs using familiar Telugu-inspired keywords and Gen-Z Telugu slang.

Instead of writing standard, intimidating English-based Python syntax, beginners can code in an approachable, engaging, and highly memorable way:

```genztelugu
# Hello World ra mama! 🔥
cheppu("Hello ra mama!")

# Conditional flow
okavela marks >= 90:
    cheppu("Dhed dhimak kaadhu, nuvvu thopu! 🏆")
lekapothe:
    cheppu("Bokka borla paddav, malli ra 📚")
```

The system translates GenZ Telugu code seamlessly into valid Python and executes it dynamically, displaying friendly translated error messages when things go wrong!

---

## 📂 Project Architecture

```
genz-telugu/
├── genztelugu/          # Core Python Package (pip-installable CLI tool)
│   ├── __main__.py      # CLI entry point (exposes 'genz' command)
│   ├── translator.py    # Regex-safe lexical translator
│   ├── runtime.py       # Code execution subprocess manager
│   ├── errors.py        # Friendly Telugu error messages translations
│   ├── keywords.py      # The 28 GenZ Telugu keyword definitions
│   └── utils.py         # System stdout configurations & platform utilities
│
├── vscode-extension/    # Marketplace-ready VS Code Extension
│   ├── src/             # Extension logic (autocompletion, hovering, runs)
│   ├── syntaxes/        # TextMate Grammar for syntax highlighting
│   ├── snippets/        # Interactive code snippets
│   └── package.json     # VS Code extension manifest & metadata
│
├── src/                 # Online Playground Web App (React + Vite + Tailwind CSS v4)
├── tests/               # Python unit and runtime execution tests
├── examples/            # Sample .gzt programs
├── pyproject.toml       # Python package configuration (pyproject-standards)
└── package.json         # Web App package manifest
```

---

## 🔤 Keyword Reference (The Translation Map)

| GenZ Telugu Keyword | Python Equivalent | Category | Example Usage |
|---|---|---|---|
| `cheppu` | `print` | Output | `cheppu("Hi ra mama")` |
| `adugu` | `input` | Input | `peru = adugu("Nee peru?")` |
| `podavu` | `len` | Built-in | `podavu("hello")` |
| `okavela` | `if` | Conditional | `okavela marks >= 95:` |
| `lekapothe_okavela` | `elif` | Conditional | `lekapothe_okavela marks >= 50:` |
| `lekapothe` | `else` | Conditional | `lekapothe:` |
| `kosam` | `for` | Loop | `kosam i lo paridhi(10):` |
| `lo` | `in` | Membership | `i lo range(5)` |
| `paridhi` | `range` | Generator | `paridhi(1, 10)` |
| `antha_varaku` | `while` | Loop | `antha_varaku condition:` |
| `pani` | `def` | Function | `pani add(a, b):` |
| `tirigi` | `return` | Function | `tirigi a + b` |
| `nijam` | `True` | Boolean | `antha_varaku nijam:` |
| `abaddam` | `False` | Boolean | `flag = abaddam` |
| `yevaru` | `None` | Constant | `value = yevaru` |
| `vadhilesi` | `break` | Loop Control | `vadhilesi` |
| `konasagu` | `continue` | Loop Control | `konasagu` |
| `kurcho` | `pass` | Placeholder | `kurcho` |
| `mariyu` | `and` | Logical | `okavela a mariyu b:` |
| `leda` | `or` | Logical | `okavela a leda b:` |
| `kadhu` | `not` | Logical | `okavela kadhu condition:` |
| `sankhya` | `int` | Cast Type | `sankhya("10")` |
| `padham` | `str` | Cast Type | `padham(100)` |
| `bhinna_sankhya` | `float` | Cast Type | `bhinna_sankhya("10.5")` |
| `gumpu` | `list` | Cast Type | `fruits = gumpu([1, 2])` |
| `vinu` | `import` | Module | `vinu random` |
| `bokka` | `Exception` | Error | `bokka("Messed up!")` |
| `motha_sankhya` | `sum` | Built-in | `motha_sankhya([1, 2, 3])` |

---

## 💻 Local Installation & Usage Guide

Follow these steps to install and run the complete GenZ Telugu suite on your local machine:

### 1. The CLI & Compiler (Python Package)

Prerequisite: **Python 3.8 or higher** must be installed on your computer.

```powershell
# Clone the repository
git clone https://github.com/yourusername/genz-telugu.git
cd genz-telugu

# Install the package in development mode
pip install -e .

# Verify the CLI tool works
genz --version
```

#### Running Code:
You can execute a `.gzt` file using:
```bash
genz examples/calculator.gzt
```

#### CLI Command Suite:
- `genz <file.gzt>`: Runs the specified file instantly.
- `genz translate <file.gzt>`: Translates the code to Python and prints the output without running.
- `genz keywords`: Prints a cheat-sheet of all 28 Telugu keywords.
- `genz repl`: Spawns an interactive interactive coding shell!

---

### 2. Running the Online Web Playground

The web-playground runs a fully-client side React app, executing Python code instantly in-browser using Pyodide (WASM)!

Prerequisite: **Node.js (18+)** installed.

```powershell
# From the root directory, install npm dependencies
npm install

# Start the development server
npm run dev
```

Open **`http://localhost:5173`** in your browser!

---

## 🧪 Testing the Compiler

The project is backed by a robust test suite covering lexical translations and process execution:

```powershell
# Install pytest
pip install pytest

# Run tests
pytest tests/ -v
```

All 26 tests will pass successfully!

---

## 💜 Contributing

We welcome keywords suggestions, improvements, or open-source additions to make programming more accessible for students! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

*Happy coding ra mama! 🎉*
