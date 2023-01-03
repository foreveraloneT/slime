import Result, { Ok, Err } from '../Result';

import { isNoneValue } from './validate';

/**
 * Wraps value with `Result<T,Error>`
 * @param value A value need to be wrapped by `Result<T,E>`
 * @returns Returns `Ok<T,Error>` if value is not one of `undefined`, `NaN` or `null`.
 * Otherwise, return `Err<T,Error>`
 */
export function from<T>(value?: T): Result<T, Error> {
  if (isNoneValue(value)) return new Err(new Error('empty result'));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Ok(value!);
}

/**
 * Wraps value with `Ok<T, E>`
 * @param value A value need to be wrapped by `Ok<T, E>`
 * @returns Returns `Ok<T, E>`
 * @throws Thrown if value is one of `undefined`, `NaN` or `null`
 */
export function ok<T, E = Error>(value: T): Ok<T, E> {
  return new Ok(value);
}

/**
 * Wraps value with `Err<T, E>`
 * @param value A value need to be wrapped by `Err<T, E>`
 * @returns Returns `Err<T, E>`
 * @throws Thrown if value is one of `undefined`, `NaN` or `null`
 */
export function err<T, E>(value: E): Err<T, E> {
  return new Err(value);
}

/**
 * Wraps a result of `Promise<T>` with `Result<T, Error>`
 * @param promise A promise
 * @returns Promise of `Ok<T, Error>` if Promise is resolved. If it rejected, returns `Err<T, Error>`
 */
export function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  return promise.then((value) => ok<T, Error>(value)).catch((error) => err<T, Error>(error));
}

export {
  Result,
  Ok,
  Err,
};
