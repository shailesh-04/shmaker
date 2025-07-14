import { color, catchErr } from '../src/utils/color';

describe('color utility', () => {
  let originalConsoleLog: typeof console.log;
  let mockConsoleLog: jest.Mock;

  beforeEach(() => {
    originalConsoleLog = console.log;
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    jest.clearAllMocks();
  });

  test('applies single color', () => {
    color(['test', 'red']);
    expect(mockConsoleLog).toHaveBeenCalledWith('\u001b[31mtest\u001b[0m');
  });

  test('applies multiple styles', () => {
    color(['test', 'green', ['bold', 'underline']]);
    expect(mockConsoleLog).toHaveBeenCalledWith('\u001b[32m\u001b[1m\u001b[4mtest\u001b[0m');
  });

  test('handles multiple messages', () => {
    color(['hello', 'blue'], ['world', 'yellow']);
    expect(mockConsoleLog).toHaveBeenCalledWith('\u001b[34mhello\u001b[0m \u001b[33mworld\u001b[0m');
  });

  test('handles missing color', () => {
    color(['test']);
    expect(mockConsoleLog).toHaveBeenCalledWith('test\u001b[0m');
  });

  test('handles invalid color gracefully', () => {
    color(['test', 'invalidColor' as any]);
    expect(mockConsoleLog).toHaveBeenCalledWith('test\u001b[0m');
  });
});

describe('catchErr utility', () => {
  let originalConsoleLog: typeof console.log;
  let mockConsoleLog: jest.Mock;

  beforeEach(() => {
    originalConsoleLog = console.log;
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    jest.clearAllMocks();
  });

  test('handles Error objects', () => {
    const error = new Error('Test error');
    error.stack = 'Error: Test error\n    at test.js:1:1';
    catchErr(error, '/test/path');
    
    const call = mockConsoleLog.mock.calls[0][0];
    expect(call).toContain('══════════ ERROR ══════════');
    expect(call).toContain('Test error');
    expect(call).toContain('/test/path');
    expect(call).toContain('at test.js:1:1');
  });

  test('handles string errors', () => {
    catchErr('Simple error', '/test/path');
    
    const call = mockConsoleLog.mock.calls[0][0];
    expect(call).toContain('Simple error');
    expect(call).toContain('/test/path');
  });

  test('handles undefined errors', () => {
    catchErr(undefined, '/test/path');
    expect(mockConsoleLog).toHaveBeenCalled();
  });
});