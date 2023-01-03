import Option, { Some, None } from '../Option';

import { isNoneValue } from './validate';

/**
 * Wraps value with `Option<T>`
 * @param value A value need to be wrapped by `Option<T>`
 * @returns Returns `Some<T>` if value is not one of `undefined`, `NaN` or `null`.
 * Otherwise, return `None`
 */
export function from<T>(value?: T): Option<T> {
  if (isNoneValue(value)) return new None();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Some(value!);
}

/**
 * Wraps value with `Some<T>`
 * @param value A value need to be wrapped by `Some<T>`
 * @returns Returns `Some<T>`
 * @throws Thrown if value is one of `undefined`, `NaN` or `null`
 */
export function some<T>(value: T): Some<T> {
  return new Some(value);
}

/**
 * Initiates `None`
 * @returns Returns `None<T>`
 */
export function none<T>(): None<T> {
  return new None();
}

/**
 * Wraps a result of `Promise<T>` with `Option<T>`
 * @param promise A promise
 * @returns Promise of `Some<T>` if Promise is resolved. If it rejected, returns `None`
 */
export function fromPromise<T>(promise: Promise<T>): Promise<Option<T>> {
  return promise.then(some).catch(() => none<T>());
}

export {
  Option,
  Some,
  None,
};
