import Result, { Ok, Err } from '@/Result';

import { isNoneValue } from './validate';

export function from<T>(value: T): Result<T, Error> {
  if (isNoneValue(value)) return new Err(new Error('empty result'));

  return new Ok(value);
}

export function ok<T1, T2>(value: T1): Ok<T1, T2> {
  return new Ok(value);
}

export function err<T1, T2>(value: T2): Err<T1, T2> {
  return new Err(value);
}

export function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  return promise.then(ok).catch((error) => err<T, Error>(error));
}

export {
  Result,
  Ok,
  Err,
};
