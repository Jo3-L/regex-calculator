/**
 * Escapes a given string for use in regex.
 * 
 * @param str - The string to escape.
 * @returns The escaped string.
 * @private
 */
const escapeRegex = (str: string) =>
	str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * Regex for an integer or decimal.
 */
export const numberRegex = /(-?\d+(?:\.\d+)?)/;

/**
 * Constructs a regex matching the given operations, and
 * replaces all instances of that regex with the output
 * of the function provided.
 * 
 * @param expr - The string.
 * @param operations - The operations to allow.
 * @param fn - The callback for the two numbers & the operation.
 * @returns The string with all instances of the operation replaced.
 */
export function replaceAll(
	expr: string,
	operations: string[],
	fn: (a: number, b: number, operator: string) => unknown,
) {
	operations = operations.map(escapeRegex);
	const regex = new RegExp(`${numberRegex.source} *([${operations.join('')}]) *${numberRegex.source}`);
	for (const match of expr.matchAll(regex)) {
		let [, a, operator, b] = match;
		const result = fn(Number(a), Number(b), operator);
		expr = interpolate(expr, String(result), match);
	}
	return expr;
}

/**
 * Replaces the given match in the expression with the
 * new string.
 * 
 * @param expr - The whole expression.
 * @param str - The string to replace the match with.
 * @param match - The output from `RegExp#exec`.
 */
export function interpolate(
	expr: string,
	str: string,
	match: RegExpMatchArray,
) {
	const before = expr.substring(0, match.index!);
	const after = expr.substring(match.index! + match[0].length);
	return before + str + after;
}
