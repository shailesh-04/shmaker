# shmaker

![npm](https://img.shields.io/npm/v/shmaker) 
![npm](https://img.shields.io/npm/dt/shmaker) 
![GitHub](https://img.shields.io/github/license/shailesh-04/shmaker)

🔗 **Package Link:** [shmaker on npm](https://www.npmjs.com/package/shmaker)

A developer-friendly CLI utility toolkit for automating repetitive tasks and enhancing console output with beautiful colors and error handling.

---

## ✨ Features

- 🎨 Colorful console output with extensive styling options
- 🚀 Simple and intuitive API
- 📝 Pretty error formatting with stack traces
- 🔧 Utility functions for random numbers and delays
- 📦 Lightweight and dependency-free
- 🦾 Full TypeScript support

---

## 📦 Installation

```bash
# Using npm
npm install shmaker

# or using yarn
yarn add shmaker
```

## 🚀 Quick Start
<!-- /============ 1.0.4 ===========/ -->
<details style="cursor:pointer;"><summary><h2>1.0.4</h2></summary><div>

  
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

## 📖 API Reference

### `color(value: any, appliedStyles?: ColorStyle | ColorStyle[])`

Applies colors and styles to text output.

**Parameters:**
- `value`: Any value (will be converted to string)
- `appliedStyles`: Optional color style or array of styles

**Example:**
```javascript
color('Success!', 'green');
color('Warning', ['yellow', 'bold']);
color({ data: 'test' }, 'cyan'); // Objects are JSON stringified
```

### `colorMulti(messages: ColorMessage[])`

Applies different colors to multiple text segments.

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

Pretty error logger with colored stack traces.

**Parameters:**
- `err`: Error object or message
- `path`: Optional file path for context

**Example:**
```javascript
try {
  riskyOperation();
} catch (error) {
  catchErr(error, __filename);
}
```

## 🎨 Available Styles

### Text Colors:
- **Basic**: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- **Bright**: `brightBlack`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

### Background Colors:
- **Basic**: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- **Bright**: `bgBrightBlack`, `bgBrightRed`, `bgBrightGreen`, `bgBrightYellow`, `bgBrightBlue`, `bgBrightMagenta`, `bgBrightCyan`, `bgBrightWhite`

### Text Styles:
- `reset`, `bold`, `dim`, `italic`, `underline`, `blink`, `inverse`, `hidden`, `strikethrough`

## 🔧 Additional Utilities

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

## 🦾 TypeScript Support

Full TypeScript definitions included:

```typescript
import type { ColorStyle, ColorMessage } from 'shmaker';
```

</div></details>

<!-- /============ 1.0.3 ===========/ -->

----

<details style="cursor:pointer;"><summary><h2>1.0.3</h2></summary><div>


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

## 📄 License

MIT © [Shailesh Makavana](https://github.com/shailesh-04)

---

**Pro Tip:** Use `shmaker` to make your CLI tools, scripts, and error messages more readable and professional-looking with minimal code!
