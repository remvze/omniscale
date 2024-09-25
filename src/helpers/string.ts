export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export function truncateMiddle(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  const ellipsis = '...';
  const ellipsisLength = ellipsis.length;

  if (maxLength <= ellipsisLength) {
    return ellipsis.substring(0, maxLength);
  }

  const charsToShow = maxLength - ellipsisLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const endChars = Math.floor(charsToShow / 2);

  const front = input.substring(0, frontChars);
  const end = input.substring(input.length - endChars);

  return front + ellipsis + end;
}
