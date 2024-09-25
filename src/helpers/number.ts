export function padNumber(number: number, maxLength: number = 2): string {
  return number.toString().padStart(maxLength, '0');
}

export function formatPercentage(num: number, significantDigits = 2) {
  if (num === 0) return '0%';

  const absNum = Math.abs(num);
  const exponent = Math.floor(Math.log10(absNum));
  const factor = Math.pow(10, exponent - significantDigits + 1);
  const truncatedNum = Math.floor(absNum / factor) * factor;
  const finalNum = num < 0 ? -truncatedNum : truncatedNum;

  let fixedStr = finalNum.toFixed(
    Math.max(0, -exponent + significantDigits - 1),
  );

  fixedStr = fixedStr.replace(/\.?0+$/, '');

  return `${fixedStr}%`;
}
