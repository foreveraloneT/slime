import Result, { Ok, Err } from '../Result';

import { isNoneValue } from './validate';

export function from<T>(value?: T): Result<T, Error> {
  if (isNoneValue(value)) return new Err(new Error('empty result'));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Ok(value!);
}

export function ok<T, E>(value: T): Ok<T, E> {
  return new Ok(value);
}

export function err<T, E>(value: E): Err<T, E> {
  return new Err(value);
}

export function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  return promise.then((value) => ok<T, Error>(value)).catch((error) => err<T, Error>(error));
}

export {
  Result,
  Ok,
  Err,
};
