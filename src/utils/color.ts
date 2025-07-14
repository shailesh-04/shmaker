type ColorStyle = 
  | 'reset'|'bold'|'dim'|'italic'|'underline'|'blink'|'inverse'|'hidden'|'strikethrough'
  | 'black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'
  | 'brightBlack'|'brightRed'|'brightGreen'|'brightYellow'|'brightBlue'|'brightMagenta'|'brightCyan'|'brightWhite'
  | 'bgBlack'|'bgRed'|'bgGreen'|'bgYellow'|'bgBlue'|'bgMagenta'|'bgCyan'|'bgWhite'
  | 'bgBrightBlack'|'bgBrightRed'|'bgBrightGreen'|'bgBrightYellow'|'bgBrightBlue'|'bgBrightMagenta'|'bgBrightCyan'|'bgBrightWhite';

type ColorMessage = [text: string, color?: ColorStyle, styles?: ColorStyle | ColorStyle[]];

const styles: Record<ColorStyle, string> = {
  reset: "\u001b[0m",
  bold: "\u001b[1m",
  dim: "\u001b[2m",
  italic: "\u001b[3m",
  underline: "\u001b[4m",
  blink: "\u001b[5m",
  inverse: "\u001b[7m",
  hidden: "\u001b[8m",
  strikethrough: "\u001b[9m",
  black: "\u001b[30m",
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  magenta: "\u001b[35m",
  cyan: "\u001b[36m",
  white: "\u001b[37m",
  brightBlack: "\u001b[90m",
  brightRed: "\u001b[91m",
  brightGreen: "\u001b[92m",
  brightYellow: "\u001b[93m",
  brightBlue: "\u001b[94m",
  brightMagenta: "\u001b[95m",
  brightCyan: "\u001b[96m",
  brightWhite: "\u001b[97m",
  bgBlack: "\u001b[40m",
  bgRed: "\u001b[41m",
  bgGreen: "\u001b[42m",
  bgYellow: "\u001b[43m",
  bgBlue: "\u001b[44m",
  bgMagenta: "\u001b[45m",
  bgCyan: "\u001b[46m",
  bgWhite: "\u001b[47m",
  bgBrightBlack: "\u001b[100m",
  bgBrightRed: "\u001b[101m",
  bgBrightGreen: "\u001b[102m",
  bgBrightYellow: "\u001b[103m",
  bgBrightBlue: "\u001b[104m",
  bgBrightMagenta: "\u001b[105m",
  bgBrightCyan: "\u001b[106m",
  bgBrightWhite: "\u001b[107m",
};

/**
 * Applies color and styles to text segments
 * @param messages Array of ColorMessage tuples [text, color?, styles?]
 */
export function color(...messages: ColorMessage[]): void {
  const formatted = messages.map(([text, color, style]) => {
    let output = '';
    
    // Apply color if specified
    if (color && styles[color]) {
      output += styles[color];
    }

    // Apply styles if specified
    if (style) {
      const stylesToApply = Array.isArray(style) ? style : [style];
      stylesToApply.forEach(s => {
        if (styles[s]) output += styles[s];
      });
    }

    return output + text + styles.reset;
  });

  console.log(formatted.join(' '));
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

  color(
    ['\n══════════ ERROR ══════════', 'brightRed', ['bold', 'underline']],
    ['\n\nMessage: ', 'yellow', 'bold'],
    [message, 'brightYellow'],
    ['\n\nPath: ', 'cyan', 'bold'],
    [filePath, 'brightCyan', 'italic'],
    ['\n\nStack Trace:', 'magenta', ['underline', 'dim']],
    [stack, 'white', 'dim']
  );
}
export default color;