/* eslint-disable @typescript-eslint/no-unused-vars */

import Wrapper, { Matcher as BaseMatcher } from '@/Wrapper';
import { isNoneValue } from './utils/validate';

interface Matcher<T1, T2, U> extends BaseMatcher<U>{
  ok: (value: T1) => U;
  err: (value: T2) => U;
}

export default abstract class Result<T1, T2 = Error> extends Wrapper<T1> {
  public abstract unwrapErr(): T2;

  public abstract unwrapErrOr(value: T2): T2;

  public abstract match<U>(matcher: Matcher<T1, T2, U>): U;

  public abstract map<U>(callbackFn: (value: T1) => U): Result<U, T2>;

  public abstract mapErr<U>(callbackFn: (value: T2) => U): Result<T1, U>;

  public abstract flatMap<U>(callbackFn: (value: T1) => Result<U, T2>): Result<U, T2>;

  public abstract flatMapErr<U>(callbackFn: (value: T2) => Result<T1, U>): Result<T1, U>;

  public abstract isOk(): boolean;

  public abstract isErr(): boolean;
}

export class Ok<T1, T2> extends Result<T1, T2> {
  private readonly value: T1;

  constructor(value: T1) {
    if (isNoneValue(value)) throw new Error('Result.Ok should not be empty');

    super();

    this.value = value;
  }

  public unwrap(): T1 {
    return this.value;
  }

  public unwrapOr(value: T1): T1 {
    return this.value;
  }

  public unwrapErr(): T2 {
    throw new ReferenceError('Unable to unwrapErr Result.OK');
  }

  public unwrapErrOr(value: T2): T2 {
    return value;
  }

  public match<U>(matcher: Matcher<T1, T2, U>): U {
    return matcher.ok(this.value);
  }

  public map<U>(callbackFn: (value: T1) => U): Ok<U, T2> {
    return new Ok(callbackFn(this.value));
  }

  public mapErr<U>(callbackFn: (value: T2) => U): Ok<T1, U> {
    return new Ok(this.value);
  }

  public flatMap<U>(callbackFn: (value: T1) => Result<U, T2>): Result<U, T2> {
    return callbackFn(this.value);
  }

  public flatMapErr<U>(callbackFn: (value: T2) => Result<T1, U>): Result<T1, U> {
    return new Ok(this.value);
  }

  public catchMap(callbackFn: () => Result<T1, T2>): Ok<T1, T2> {
    return new Ok(this.value);
  }

  public isOk(): boolean {
    return true;
  }

  public isErr(): boolean {
    return false;
  }
}

export class Err<T1, T2> extends Result<T1, T2> {
  private readonly value: T2;

  constructor(value: T2) {
    if (isNoneValue(value)) throw new Error('Result.Ok should not be empty');

    super();

    this.value = value;
  }

  public unwrap(): T1 {
    throw new ReferenceError('unable to unwrap Result.Err');
  }

  public unwrapOr(value: T1): T1 {
    return value;
  }

  public unwrapErr(): T2 {
    return this.value;
  }

  public unwrapErrOr(value: T2): T2 {
    return this.value;
  }

  public match<U>(matcher: Matcher<T1, T2, U>): U {
    return matcher.err(this.value);
  }

  public map<U>(callbackFn: (value: T1) => U): Err<U, T2> {
    return new Err(this.value);
  }

  public mapErr<U>(callbackFn: (value: T2) => U): Err<T1, U> {
    return new Err(callbackFn(this.value));
  }

  public flatMap<U>(callbackFn: (value: T1) => Result<U, T2>): Err<U, T2> {
    return new Err(this.value);
  }

  public flatMapErr<U>(callbackFn: (value: T2) => Result<T1, U>): Result<T1, U> {
    return callbackFn(this.value);
  }

  public catchMap(callbackFn: () => Result<T1, T2>): Result<T1, T2> {
    return callbackFn();
  }

  public isOk(): boolean {
    return false;
  }

  public isErr(): boolean {
    return true;
  }
}
