/* eslint-disable @typescript-eslint/no-unused-vars */

import Wrapper, { Matcher as BaseMatcher } from './Wrapper';
import Option, { Some, None } from './Option';
import { isNoneValue } from './utils/validate';

interface Matcher<T, E, U> extends BaseMatcher<U>{
  ok: (value: T) => U;
  err: (value: E) => U;
}

/**
 * `Result<T, E>` represents either success (`Ok<T, E>`) or failure (`Err<T, E>`)
 */
export default abstract class Result<T, E = Error> extends Wrapper<T> {
  /**
   * Unwraps contained `Ok<T, E>` value. Throws error if the `Result` is `Err`
   * @returns A value in `Ok<T, E>`
   * @throws { ReferenceError }
   * Thrown if the `Result` is `Err`
   */
  public abstract unwrap(): T;

  /**
   * Returns the contained `Ok<T, E>` value or a provided default
   * @param defaultValue A default value to return in case the `Result` is `Err`
   * @returns A value in `Ok<T, E>` or a default value
   */
  public abstract unwrapOr(defaultValue: T): T;

  /**
   * Unwraps contained `Err<T, E>` value. Throws error if the `Result` is `Ok`
   * @returns A value in `Err<T, E>`
   * @throws { ReferenceError }
   * Thrown if the `Result` is `Ok`
   */
  public abstract unwrapErr(): E;

  /**
   * Returns the contained `Err<T, E>` value or a provided default
   * @param defaultValue A default value to return in case the `Result` is `Ok`
   * @returns A value in `Err<T, E>` or a default value
   */
  public abstract unwrapErrOr(defaultValue: E): E;

  /**
   * Inspired from pattern matching patterns
   * @remarks See {@link https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html}
   * @param matcher Object that contains call back function for `Some` and `None`
   * @returns value (or void) from matcher's callback function
   * @example
   * Here's a simple example
   * ```ts
   * const ok = new Ok<number, Error>(2);
   * const result = ok.match({
   *  ok: (value) => `Result: ${value}`,
   *  err: (value) => `Error: ${error.message}`,
   * });
   *
   * console.log(result); // 'Result: 2'
   * ```
   */
  public abstract match<U>(matcher: Matcher<T, E, U>): U;

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a callback function that receive contained `Ok<T, E>` value and return a result, Leave an `Err<T, E>` untouched
   * @param callbackFn - A function that accept contained `Ok<T, E>` value and return a result
   * @returns A `Result<U, E>` that contains a result of calling callbackFn
   */
  public abstract map<U>(callbackFn: (value: T) => U): Result<U, E>;

  /**
   * Maps a `Result<T, E>` to `Result<T, U>` by applying a callback function that receive contained `Err<T, E>` value and return a result, Leave an `Ok<T, E>` untouched
   * @param callbackFn - A function that accept contained `Err<T, E>` value and return a result
   * @returns A `Result<T, U>` that contains a result of calling callbackFn
   */
  public abstract mapErr<U>(callbackFn: (value: E) => U): Result<T, U>;

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a callback function that receive contained `Ok<T, E>` value, then flatten the result
   * @param callbackFn - A function that accept contained `Ok<T, E>` value and return a new `Result<U, E>`
   * @returns A `Result<U, E>` that contains a result of calling callbackFn and flatten it
   */
  public abstract flatMap<U>(callbackFn: (value: T) => Result<U, E>): Result<U, E>;

  /**
   * Maps a `Result<T, E>` to `Result<T, U>` by applying a callback function that receive contained `Err<T, E>` value, then flatten the result
   * @param callbackFn - A function that accept contained `Err<T, E>` value and return a new `Result<T, U>`
   * @returns A `Result<T, U>` that contains a result of calling callbackFn and flatten it
   */
  public abstract flatMapErr<U>(callbackFn: (value: E) => Result<T, U>): Result<T, U>;

  /**
   * Catch Maps to `Result<T, E>` when `Result` is `None`
   * @param callbackFn - A function that return a new `Result<T, E>`
   * @returns A `Result<T, E>`
   */
  public abstract catchMap(callbackFn: () => Result<T, E>): Result<T, E>;

  /**
   * Returns true if the `Result` is `Ok`
   * @returns A boolean
   */
  public abstract isOk(): boolean;

  /**
   * Returns true if the `Result` is `Err`
   * @returns A boolean
   */
  public abstract isErr(): boolean;

  /**
   * Converts from `Result<T, E>` to {@link Option | `Option<T>`}.
   * @returns Returns `Some<T>` with contained `Ok<T, E>` value. Otherwise returns `None`
   * @example
   * Here's a simple example
   * ```ts
   * const ok = new Ok<string, number>('Success');
   * const err = new Err<string, number>(404);
   *
   * console.log(ok.ok()); // Some('Success')
   * console.log(err.ok()); // None
   * ```
   */
  public abstract ok(): Option<T>;

  /**
   * Converts from `Result<T, E>` to {@link Option | `Option<E>`}.
   * @returns Returns `Some<T>` with contained `Err<T, E>` value. Otherwise returns `None`
   * * @example
   * Here's a simple example
   * ```ts
   * const ok = new Ok<string, number>('Success');
   * const err = new Err<string, number>(404);
   *
   * console.log(ok.err()); // None
   * console.log(err.err()); // Some(404)
   * ```
   */
  public abstract err(): Option<E>;

  /**
   * Inspects contained `Ok<T, E>` value. Do nothing if `Result` is `Err`
   * @remarks Uses for development propose only. Should not use for production.
   * @param callbackFn - A function that accept contained `Ok<T, E>` value
   */
  public abstract inspect(callbackFn: (value: T) => void): this;

  /**
   * Inspects contained `Err<T, E>` value. Do nothing if `Result` is `Ok`
   * @remarks Uses for development propose only. Should not use for production.
   * @param callbackFn - A function that accept contained `Err<T, E>` value
   */
  public abstract inspectErr(callbackFn: (value: E) => void): this;
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

  public ok(): Option<T> {
    return new Some(this.value);
  }

  public err(): Option<E> {
    return new None();
  }

  public inspect(callbackFn: (value: T) => void): this {
    callbackFn(this.value);

    return this;
  }

  public inspectErr(callbackFn: (value: E) => void): this {
    return this;
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

  public ok(): Option<T> {
    return new None();
  }

  public err(): Option<E> {
    return new Some(this.value);
  }

  public inspect(callbackFn: (value: T) => void): this {
    return this;
  }

  public inspectErr(callbackFn: (value: E) => void): this {
    callbackFn(this.value);

    return this;
  }
}
