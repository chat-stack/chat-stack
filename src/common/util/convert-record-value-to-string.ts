export function convertRecordValueToString(
  input: Record<string, any>,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const value = input[key];
      const jsonString = JSON.stringify(value);
      result[key] = jsonString;
    }
  }

  return result;
}
