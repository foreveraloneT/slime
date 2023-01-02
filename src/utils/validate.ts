// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNoneValue(value: any): boolean {
  return typeof value === 'undefined' || value === null || Number.isNaN(value);
}
