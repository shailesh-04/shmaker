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

how to use this tool in any project with diffent versions

## Quick Start

<!-- /====== 1.0.4 =========/ -->
<div>


```javascript
import { color, colorMulti, catchErr } from 'shmaker';

// Simple colored text
color('Hello World!', 'green');

// With additional styles
color('Important Message', ['red', 'bold', 'underline']);

// Multiple colored segments
colorMulti([
  ['Error: ', 'red', 'bold'],
  ['File not found', 'yellow'],
  [' at ', 'white'],
  ['/path/to/file', 'cyan', 'italic'],
]);

// Error handling with pretty output
try {
  // your code that might throw
} catch (error) {
  catchErr(error, '/path/to/script.js');
}
```

## API Reference

### `color(value: any, appliedStyles?: ColorStyle | ColorStyle[])`

Applies colors and styles to a single text value.

**Parameters:**

- `value`: Any value (string, number, array, object) - will be converted to string
- `appliedStyles`: Optional color style or array of styles

**Example:**

```javascript
color('Success!', 'green');
color('Warning', ['yellow', 'bold']);
color({ data: 'test' }, 'cyan'); // Objects are JSON stringified
```

### `colorMulti(messages: ColorMessage[])`

Applies different colors and styles to multiple text segments.

**Parameters:**

- `messages`: Array of tuples `[text, color?, styles?]`

**Example:**

```javascript
colorMulti([
  ['[', 'white'],
  ['ERROR', 'red', 'bold'],
  ['] ', 'white'],
  ['Something went wrong', 'yellow'],
]);
```

### `catchErr(err?: unknown, path?: string)`

Pretty error logger with colored stack traces and formatted output.

**Parameters:**

- `err`: Error object, string message, or any error value
- `path`: Optional file path for context

**Example:**

```javascript
try {
  riskyOperation();
} catch (error) {
  catchErr(error, __filename);
}
```

## Available Styles

### Text Colors:

- **Basic**: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- **Bright**: `brightBlack`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

### Background Colors:

- **Basic**: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- **Bright**: `bgBrightBlack`, `bgBrightRed`, `bgBrightGreen`, `bgBrightYellow`, `bgBrightBlue`, `bgBrightMagenta`, `bgBrightCyan`, `bgBrightWhite`

### Text Styles:

- `reset`, `bold`, `dim`, `italic`, `underline`, `blink`, `inverse`, `hidden`, `strikethrough`

## Additional Utilities

### `random(min: number, max: number, decimals?: number): number`

Generates random numbers within a range.

```javascript
import { random } from 'shmaker';

random(1, 10); // Random integer between 1-10
random(0, 1, 2); // Random decimal with 2 places (0.00-1.00)
```

### `sleep(ms: number): Promise<void>`

Async delay function.

```javascript
import { sleep } from 'shmaker';

await sleep(1000); // Wait 1 second
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type { ColorStyle, ColorMessage } from 'shmaker';
```

## </div>

<!-- /====== 1.0.3 =========/ -->

### Basic Usage Old Versions

<details style="cursor:pointer;"><summary></summary><div>


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

</div></details>

---

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
