import Option, { Some, None } from '@/Option';
import { isNoneValue } from './validate';

export function from<T>(value: T): Option<T> {
  if (isNoneValue(value)) return new None();

  return new Some(value);
}

export function some<T>(value: T): Some<T> {
  return new Some(value);
}

export function none<T>(): None<T> {
  return new None();
}

export function fromPromise<T>(promise: Promise<T>): Promise<Option<T>> {
  return promise.then(some).catch(() => none<T>());
}
