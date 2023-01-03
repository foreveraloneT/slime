/* eslint-disable @typescript-eslint/no-unused-vars */

import Wrapper, { Matcher as BaseMatcher } from './Wrapper';
import { isNoneValue } from './utils/validate';

interface Matcher<T, E, U> extends BaseMatcher<U>{
  ok: (value: T) => U;
  err: (value: E) => U;
}

export default abstract class Result<T, E = Error> extends Wrapper<T> {
  public abstract unwrapErr(): E;

  public abstract unwrapErrOr(value: E): E;

  public abstract match<U>(matcher: Matcher<T, E, U>): U;

  public abstract map<U>(callbackFn: (value: T) => U): Result<U, E>;

  public abstract mapErr<U>(callbackFn: (value: E) => U): Result<T, U>;

  public abstract flatMap<U>(callbackFn: (value: T) => Result<U, E>): Result<U, E>;

  public abstract flatMapErr<U>(callbackFn: (value: E) => Result<T, U>): Result<T, U>;

  public abstract isOk(): boolean;

  public abstract isErr(): boolean;
}

export class Ok<T, E> extends Result<T, E> {
  private readonly value: T;

  constructor(value: T) {
    if (isNoneValue(value)) throw new Error('Result.Ok should not be empty');

    super();

    this.value = value;
  }

  public unwrap(): T {
    return this.value;
  }

  public unwrapOr(value: T): T {
    return this.value;
  }

  public unwrapErr(): E {
    throw new ReferenceError('Unable to unwrapErr Result.OK');
  }

  public unwrapErrOr(value: E): E {
    return value;
  }

  public match<U>(matcher: Matcher<T, E, U>): U {
    return matcher.ok(this.value);
  }

  public map<U>(callbackFn: (value: T) => U): Ok<U, E> {
    return new Ok(callbackFn(this.value));
  }

  public mapErr<U>(callbackFn: (value: E) => U): Ok<T, U> {
    return new Ok(this.value);
  }

  public flatMap<U>(callbackFn: (value: T) => Result<U, E>): Result<U, E> {
    return callbackFn(this.value);
  }

  public flatMapErr<U>(callbackFn: (value: E) => Result<T, U>): Result<T, U> {
    return new Ok(this.value);
  }

  public catchMap(callbackFn: () => Result<T, E>): Ok<T, E> {
    return new Ok(this.value);
  }

  public isOk(): boolean {
    return true;
  }

  public isErr(): boolean {
    return false;
  }
}

export class Err<T, E> extends Result<T, E> {
  private readonly value: E;

  constructor(value: E) {
    if (isNoneValue(value)) throw new Error('Result.Ok should not be empty');

    super();

    this.value = value;
  }

  public unwrap(): T {
    throw new ReferenceError('unable to unwrap Result.Err');
  }

  public unwrapOr(value: T): T {
    return value;
  }

  public unwrapErr(): E {
    return this.value;
  }

  public unwrapErrOr(value: E): E {
    return this.value;
  }

  public match<U>(matcher: Matcher<T, E, U>): U {
    return matcher.err(this.value);
  }

  public map<U>(callbackFn: (value: T) => U): Err<U, E> {
    return new Err(this.value);
  }

  public mapErr<U>(callbackFn: (value: E) => U): Err<T, U> {
    return new Err(callbackFn(this.value));
  }

  public flatMap<U>(callbackFn: (value: T) => Result<U, E>): Err<U, E> {
    return new Err(this.value);
  }

  public flatMapErr<U>(callbackFn: (value: E) => Result<T, U>): Result<T, U> {
    return callbackFn(this.value);
  }

  public catchMap(callbackFn: () => Result<T, E>): Result<T, E> {
    return callbackFn();
  }

  public isOk(): boolean {
    return false;
  }

  public isErr(): boolean {
    return true;
  }
}
