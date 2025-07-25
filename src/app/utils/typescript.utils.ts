export function isArrayString(input: any): input is string[] {
  return (
    Array.isArray(input) && input.every((item) => typeof item === 'string')
  );
}
