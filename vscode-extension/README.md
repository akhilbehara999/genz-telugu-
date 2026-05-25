# GenZ Telugu — VS Code Extension

> Write Python using Telugu-inspired Gen-Z syntax. Translate, run, and learn programming in a fun and familiar way. 🔥

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=genz-telugu.genz-telugu-lang"><img src="https://img.shields.io/visual-studio-marketplace/v/genz-telugu.genz-telugu-lang" alt="VS Code Marketplace Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=genz-telugu.genz-telugu-lang"><img src="https://img.shields.io/visual-studio-marketplace/i/genz-telugu.genz-telugu-lang" alt="Installs" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=genz-telugu.genz-telugu-lang"><img src="https://img.shields.io/visual-studio-marketplace/r/genz-telugu.genz-telugu-lang" alt="Rating" /></a>
  <a href="https://github.com/akhilbehara999/genz-telugu-/blob/main/LICENSE"><img src="https://img.shields.io/github/license/akhilbehara999/genz-telugu-.svg" alt="License" /></a>
</p>

## Features

### Syntax Highlighting
Full syntax highlighting for `.gzt` files with distinct colors for:
- **Keywords** (control flow, declarations, output)
- **Strings** (single, double, triple-quoted)
- **Comments** (line comments with `#`)
- **Numbers** (integers and floats)
- **Built-in functions** (adugu, podavu, sankhya, etc.)

### Auto Completion
Type any GenZ Telugu keyword and get instant suggestions:
- `cheppu` → `print`
- `okavela` → `if`
- `kosam` → `for`
- `pani` → `def`
- And 20+ more keywords

### Hover Information
Hover over any GenZ Telugu keyword to see its Python equivalent.

### Snippets
Type a prefix and press `Tab` to expand:

| Prefix | Expands To |
|---|---|
| `ifgzt` | `okavela condition:` block |
| `forgzt` | `kosam i lo paridhi(10):` loop |
| `fungzt` | `pani function_name():` definition |
| `cheppu` | `cheppu("message")` |
| `hello` | `cheppu("Hello ra mama! 🔥")` |
| `maingzt` | Main function boilerplate |

### Run GenZ Telugu File
- Click the **▶ Play** button in the editor toolbar
- Or press `Ctrl+Enter`
- Or right-click a `.gzt` file → **Run GenZ Telugu File**

Output appears in the **GenZ Telugu** output panel.

### Translate to Python
- Click the **⇄ Symbol** button in the editor toolbar
- Or press `Ctrl+Shift+T`
- Opens translated Python code side-by-side

### Keywords Reference
Open Command Palette (`Ctrl+Shift+P`) → **GenZ Telugu: Show Keywords Reference**

### Error Decorations
Execution errors are shown as inline decorations in the editor with line numbers.

## Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **GenZ Telugu**
4. Click **Install**

## Requirements

- Python 3.8+ installed and available in your PATH
- VS Code 1.75.0+

## Configuration

| Setting | Default | Description |
|---|---|---|
| `genztelugu.pythonPath` | `python` | Path to Python executable |
| `genztelugu.autoTranslate` | `true` | Show translated Python in output when running |

## Keyword Reference

### Basic
| GenZ Telugu | Python |
|---|---|
| `cheppu` | `print` |
| `adugu` | `input` |
| `podavu` | `len` |

### Conditionals
| GenZ Telugu | Python |
|---|---|
| `okavela` | `if` |
| `lekapothe_okavela` | `elif` |
| `lekapothe` | `else` |

### Loops
| GenZ Telugu | Python |
|---|---|
| `kosam` | `for` |
| `lo` | `in` |
| `paridhi` | `range` |
| `antha_varaku` | `while` |

### Functions
| GenZ Telugu | Python |
|---|---|
| `pani` | `def` |
| `tirigi` | `return` |

### Values
| GenZ Telugu | Python |
|---|---|
| `nijam` | `True` |
| `abaddam` | `False` |
| `yevaru` | `None` |

### Operators
| GenZ Telugu | Python |
|---|---|
| `mariyu` | `and` |
| `leda` | `or` |
| `kadhu` | `not` |

## Example

```genztelugu
# Hello World ra mama!
cheppu("Hello ra mama! 🔥")

# Conditionals
okavela marks >= 90:
    cheppu("Thopu ra! 🏆")
lekapothe:
    cheppu("Malli ra 📚")

# Loops
kosam i lo paridhi(5):
    cheppu("Number:", i)

# Functions
pani add(a, b):
    tirigi a + b

cheppu("5 + 3 =", add(5, 3))
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Enter` | Run current file |
| `Ctrl+Shift+T` | Translate to Python |

## License

MIT

## Repository

[GitHub](https://github.com/akhilbehara999/genz-telugu-)
