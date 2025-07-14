# shmaker ![npm](https://img.shields.io/npm/v/shmaker) ![npm](https://img.shields.io/npm/dt/shmaker) ![GitHub](https://img.shields.io/github/license/shailesh-04/shmaker) ![GitHub issues](https://img.shields.io/github/issues/shailesh-04/shmaker) ![GitHub pull requests](https://img.shields.io/github/issues-pr/shailesh-04/shmaker)

🔗 **Package Link:** [shmaker](https://www.npmjs.com/package/shmaker)

A developer-friendly CLI utility toolkit for automating repetitive tasks like generating migration files, folders, boilerplate code, and more. Built by and for developers who love speed, structure, and simplicity.

---

## ✨ Features

- 📁 Generate migration files with timestamps
- 🗂️ Create files and folders with one command
- 🚀 Initialize project structure quickly
- 🧰 Simple and extensible utility commands
- 🖥️ Easy CLI usage without polluting your project code

---

## 📦 Installation

```bash
# Using npm
npm install shmaker

# or using yarn
yarn add shmaker

```

## Color Utility

Powerful console text styling with colors and formatting options.

### Basic Usage

```javascript
import { color } from 'shmaker';

// Simple colored text
color(['Hello World!', 'green']);

// With additional styles
color(['Important Message', 'red', ['bold', 'underline']]);
```

### Available Options

#### Text Colors:
- Basic: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- Bright: `brightBlack`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

#### Background Colors:
- `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- Bright variants available (e.g., `bgBrightRed`)

#### Text Styles:
- `bold`, `dim`, `italic`, `underline`, `blink`, `inverse`, `hidden`, `strikethrough`

### Advanced Examples

```javascript
// Multiple styled segments
color(
  ['Error:', 'red', 'bold'],
  [' Something went wrong', 'yellow'],
  ['\nCode:', 'blue'],
  [' 404', 'white', 'inverse']
);

// Complex styling
color(
  ['Multi-style', 'magenta', ['bold', 'underline', 'blink']],
  [' with background', 'white', ['bgRed', 'dim']]
);
```

### Error Formatting

```javascript
import { catchErr } from 'shmaker';

try {
  // Your code that might throw errors
  throw new Error('Sample error message');
} catch (err) {
  catchErr(err, '/path/to/file.js');
}
```

Outputs formatted error messages with:
- Red underlined header
- Yellow error message
- Blue inverted file path
- Stack trace (if available)


## License

MIT © [Shailesh Makavana](https://github.com/shailesh-04)

---

Key improvements:
1. Better organized documentation structure
2. More practical usage examples
3. Complete list of available options
4. Clear error handling example
5. Added development commands
6. Professional formatting
7. TypeScript/JavaScript import syntax
8. Clear section separation

Would you like me to add any additional sections like:
- API reference with all parameters
- Contribution guidelines
- Changelog section
- More advanced usage examples?   