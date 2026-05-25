# Contributing to GenZ Telugu

Thank you for your interest in contributing! This project is built for Telugu-speaking students who want to learn programming in a fun, familiar way.

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/genz-telugu.git
cd genz-telugu

# Install Python package (development mode)
pip install -e .
pip install pytest

# Install web app dependencies
npm install

# Install VS Code extension dependencies
cd vscode-extension
npm install
cd ..
```

## 📂 Project Structure

```
genz-telugu/
├── genztelugu/          # Python package (CLI)
├── vscode-extension/    # VS Code extension
├── src/                 # Web app (React + Vite)
├── tests/               # Python tests
├── examples/            # Sample .gzt programs
├── pyproject.toml       # Python package config
└── package.json         # Web app config
```

## 🧪 Running Tests

```bash
# Python tests
pytest tests/ -v

# Web app tests
npm run test
```

## 📝 Adding New Keywords

1. Open `genztelugu/keywords.py`
2. Add to the `KEYWORDS` dictionary:
   ```python
   "your_keyword": "python_equivalent",
   ```
3. Add to the appropriate group in `KEYWORD_GROUPS`
4. Update the VS Code extension grammar in `vscode-extension/syntaxes/genztelugu.tmLanguage.json`
5. Add a snippet in `vscode-extension/snippets/genztelugu.code-snippets`
6. Add tests in `tests/test_translator.py`
7. Update `README.md` keyword reference table

## 🐛 Reporting Bugs

Please include:

- Your OS and Python version
- The `.gzt` code that caused the issue
- The error message (full traceback)
- Expected behavior vs actual behavior

## 💡 Feature Requests

We welcome ideas! Please describe:

- What problem this solves
- Who would benefit
- Any implementation ideas

## 🔄 Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Add/update tests
5. Run all tests: `pytest tests/ -v && npm run test`
6. Commit with a clear message: `feat: add new keyword 'something'`
7. Push and open a Pull Request

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `test:` — Adding or updating tests
- `refactor:` — Code refactoring
- `chore:` — Maintenance tasks

### Examples

```
feat: add 'mali_mali' keyword for while loops
fix: handle Unicode characters in CLI output
docs: update keyword reference table
test: add runtime execution tests
```

## 🌐 Translation Contributions

Want to add more Telugu keywords or improve error translations?

- Keywords: `genztelugu/keywords.py`
- Error messages: `genztelugu/errors.py`

Make sure the Telugu is natural and familiar (Gen-Z style preferred over formal Telugu).

## 📦 Publishing

### Python Package

```bash
pip install build twine
python -m build
twine upload dist/*
```

### VS Code Extension

```bash
cd vscode-extension
npx vsce publish
```

### Web App

Push to `main` — GitHub Actions deploys automatically.

## 🙏 Code of Conduct

- Be respectful and inclusive
- Help beginners feel welcome
- Keep the fun, meme-worthy spirit alive
- No gatekeeping — everyone starts somewhere

## ❓ Questions?

Open an issue or reach out on GitHub Discussions.

Happy coding ra mama! 🔥
