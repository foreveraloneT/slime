/* eslint-disable @typescript-eslint/no-unused-vars */

import Monad from '@/Monad';
import { isNoneValue } from '@/utils/validate';
import Applicative from './Applicative';

interface Matcher<T, U> {
  some: (value: T) => U;
  none: () => U;
}

export default abstract class Option<T> extends Monad<T> {
  public abstract map<U>(callbackFn: (value: T) => U): Option<U>;

  public abstract ap<U>(apCb: Option<(value: T) => U>): Option<U>;

  public abstract flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U>;

  public abstract isSome(): boolean;

  public abstract isNone(): boolean;

  public abstract match<U>(matcher: Matcher<T, U>): U;
}

export class Some<T> extends Option<T> {
  private readonly value: T;

  constructor(value: T) {
    if (isNoneValue(value)) throw new Error('Option.Some should not be empty');

    super();

    this.value = value;
  }

  public isSome(): boolean {
    return true;
  }

  public isNone(): boolean {
    return false;
  }

  public match<U>(matcher: Matcher<T, U>): U {
    return matcher.some(this.value);
  }

  public map<U>(callbackFn: (value: T) => U): Some<U> {
    return new Some(callbackFn(this.value));
  }

  public flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U> {
    return callbackFn(this.value);
  }

  public unwrap(): T {
    return this.value;
  }

  public unwrapOr(value: T): T {
    return this.value;
  }

  public ap<U>(wrapped: Option<(value: T) => U>): Option<U> {
    return wrapped.match({
      some: (cb) => this.map(cb),
      none: () => new None(),
    });
  }
}

export class None<T> extends Option<T> {
  public isSome(): boolean {
    return false;
  }

  public isNone(): boolean {
    return true;
  }

  public match<U>(matcher: Matcher<T, U>): U {
    return matcher.none();
  }

  public map<U>(callbackFn: (value: T) => U): None<U> {
    return new None();
  }

  public flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U> {
    return new None();
  }

  public ap<U>(wrapped: Option<(value: T) => U>): Option<U> {
    return new None();
  }

  public unwrap(): T {
    throw new ReferenceError('unable to unwrap Option.None');
  }

  public unwrapOr(value: T): T {
    return value;
  }
}
