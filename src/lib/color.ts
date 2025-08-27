type ColorStyle =
  | 'reset'
  | 'bold'
  | 'dim'
  | 'italic'
  | 'underline'
  | 'blink'
  | 'inverse'
  | 'hidden'
  | 'strikethrough'
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'brightBlack'
  | 'brightRed'
  | 'brightGreen'
  | 'brightYellow'
  | 'brightBlue'
  | 'brightMagenta'
  | 'brightCyan'
  | 'brightWhite'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgBrightBlack'
  | 'bgBrightRed'
  | 'bgBrightGreen'
  | 'bgBrightYellow'
  | 'bgBrightBlue'
  | 'bgBrightMagenta'
  | 'bgBrightCyan'
  | 'bgBrightWhite';

type ColorMessage = [text: string, color?: ColorStyle, styles?: ColorStyle | ColorStyle[]];

const styles: Record<ColorStyle, string> = {
  reset: '\u001b[0m',
  bold: '\u001b[1m',
  dim: '\u001b[2m',
  italic: '\u001b[3m',
  underline: '\u001b[4m',
  blink: '\u001b[5m',
  inverse: '\u001b[7m',
  hidden: '\u001b[8m',
  strikethrough: '\u001b[9m',
  black: '\u001b[30m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  blue: '\u001b[34m',
  magenta: '\u001b[35m',
  cyan: '\u001b[36m',
  white: '\u001b[37m',
  brightBlack: '\u001b[90m',
  brightRed: '\u001b[91m',
  brightGreen: '\u001b[92m',
  brightYellow: '\u001b[93m',
  brightBlue: '\u001b[94m',
  brightMagenta: '\u001b[95m',
  brightCyan: '\u001b[96m',
  brightWhite: '\u001b[97m',
  bgBlack: '\u001b[40m',
  bgRed: '\u001b[41m',
  bgGreen: '\u001b[42m',
  bgYellow: '\u001b[43m',
  bgBlue: '\u001b[44m',
  bgMagenta: '\u001b[45m',
  bgCyan: '\u001b[46m',
  bgWhite: '\u001b[47m',
  bgBrightBlack: '\u001b[100m',
  bgBrightRed: '\u001b[101m',
  bgBrightGreen: '\u001b[102m',
  bgBrightYellow: '\u001b[103m',
  bgBrightBlue: '\u001b[104m',
  bgBrightMagenta: '\u001b[105m',
  bgBrightCyan: '\u001b[106m',
  bgBrightWhite: '\u001b[107m',
};
/**
 * Applies color and styles to text segments
 * @param messages Array of ColorMessage tuples [text, color?, styles?]
 */
export function color(
  value: any,
  appliedStyles?: ColorStyle | ColorStyle[]
): void {
  let text = "";

  // Convert input to string
  if (typeof value === "string" || typeof value === "number") {
    text = String(value);
  } else if (Array.isArray(value)) {
    text = value.join(", "); // Join array items
  } else if (typeof value === "object" && value !== null) {
    text = JSON.stringify(value, null, 2); // Pretty print object
  } else {
    text = String(value); // fallback
  }

  // Normalize styles array
  const stylesToApply = appliedStyles
    ? Array.isArray(appliedStyles)
      ? appliedStyles
      : [appliedStyles]
    : [];

  // Apply all styles
  let output = "";
  stylesToApply.forEach((s) => {
    if (styles[s]) output += styles[s];
  });

  console.log(output + text + styles.reset);
}

// Add this new function to handle multiple color segments
/**
 * 
 * @param messages Array of ColorMessage tuples [text, color?, styles?]
 * 
 */
export function colorMulti(messages: ColorMessage[]): void {
  let output = '';

  messages.forEach(([text, color, stylesToApply]) => {
    // Normalize styles array
    const stylesArray = stylesToApply
      ? Array.isArray(stylesToApply)
        ? stylesToApply
        : [stylesToApply]
      : [];

    // Apply color if specified
    if (color && styles[color]) {
      output += styles[color];
    }

    // Apply additional styles
    stylesArray.forEach(s => {
      if (styles[s]) output += styles[s];
    });

    output += text;

    // Reset styles after each segment
    output += styles.reset;
  });

  console.log(output);
}

/**
 * Pretty error logger
 * @param err Error object, string message, or undefined
 * @param path Optional path string
 */
export function catchErr(err?: unknown, path?: string): void {
  let message = 'Unknown error';
  let stack = '';
  let filePath = path ?? 'Unknown';

  if (typeof err === 'string') {
    message = err;
  } else if (err instanceof Error) {
    message = err.message;
    stack = err.stack?.split('\n').slice(1).join('\n') ?? '';
  } else if (err && typeof err === 'object') {
    try {
      message = JSON.stringify(err, null, 2);
    } catch {
      message = String(err);
    }
  }

  // Use the new colorMulti function instead of color
  colorMulti([
    ['\n══════════════════════════════════════', 'brightRed', ['bold']],
    ['\n   🚨  ERROR OCCURRED', 'brightRed', ['bold', 'underline']],
    ['\n══════════════════════════════════════\n', 'brightRed', ['bold']],

    ['\n🛠  Stack Trace:\n', 'magenta', ['underline', 'bold']],
    [stack.split("\n").slice(0, 4).join("\n"), 'white', 'dim'],

    ['\n\n📌 Message: ', 'yellow', 'bold'],
    [message, 'brightYellow'],

    ['\n📂 Path: ', 'cyan', 'bold'],
    [filePath, 'brightCyan', 'italic'],



    ['\n══════════════════════════════════════\n', 'brightRed', ['bold']]
  ]);
}