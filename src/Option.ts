/* eslint-disable @typescript-eslint/no-unused-vars */

import Wrapper, { Matcher as BaseMatcher } from './Wrapper';
import { isNoneValue } from './utils/validate';

interface Matcher<T, U> extends BaseMatcher<U>{
  some: (value: T) => U;
  none: () => U;
}

export default abstract class Option<T> extends Wrapper<T> {
  public abstract match<U>(matcher: Matcher<T, U>): U;

  public abstract map<U>(callbackFn: (value: T) => U): Option<U>;

  public abstract flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U>;

  public abstract isSome(): boolean;

  public abstract isNone(): boolean;
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

  public catchMap(callbackFn: () => Some<T>): Some<T> {
    return new Some(this.value);
  }

  public unwrap(): T {
    return this.value;
  }

  public unwrapOr(value: T): T {
    return this.value;
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

  public flatMap<U>(callbackFn: (value: T) => Option<U>): None<U> {
    return new None();
  }

  public catchMap(callbackFn: () => Option<T>): Option<T> {
    return callbackFn();
  }

  public unwrap(): T {
    throw new ReferenceError('unable to unwrap Option.None');
  }

  public unwrapOr(value: T): T {
    return value;
  }
}
