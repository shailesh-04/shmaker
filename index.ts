import { color, catchErr, random, sleep } from './src';
try {
    throw new Error('Test error');
} catch (error) {
    catchErr(error, '/test/path');

}