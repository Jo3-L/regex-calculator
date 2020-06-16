import { replaceAll, interpolate, numberRegex } from './util';
import readline from 'readline';

const bracketRegex = /\(([^()]+)\)/;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

process.stdout.write('> ');
rl.on('line', input => {
	const result = evaluate(input);
	if (isNaN(result)) console.log('That was not valid input. Try again.');
	else console.log('Result:', result);
	process.stdout.write('> ');
});

/**
 * Evaluates the given mathematical expression.
 * 
 * @param expr - The expressio to evaluate.
 * @returns The result.
 * @throws If the expression is invalid.
 * @private
 */
function evaluate(expr: string) {
	for (const match of expr.matchAll(bracketRegex)) expr = interpolate(expr, String(evaluate(match[1])), match);
	expr = replaceAll(expr, ['^'], (a, b) => a ** b);
	expr = replaceAll(expr, ['*', '/'], (a, b, op) => op === '*' ? a * b : a / b);
	expr = replaceAll(expr, ['+', '-'], (a, b, op) => op === '+' ? a + b : a - b);

	if (numberRegex.test(expr)) return Number(expr);
	return NaN;
}
