/* eslint-disable @typescript-eslint/no-unused-vars */

import Wrapper, { Matcher as BaseMatcher } from './Wrapper';
import { isNoneValue } from './utils/validate';

interface Matcher<T, U> extends BaseMatcher<U>{
  some: (value: T) => U;
  none: () => U;
}

/**
 * `Option<T>` represents an optional value. Every `Option<T>` is either `Some<T>` and contains a value,
 * or `None<T>` which represents an empty value (`undefined`, `NaN`, `null`)
 */
export default abstract class Option<T> extends Wrapper<T> {
  /**
   * Unwraps contained `Some<T>` value. Throws error if the `Option` is `None`
   * @returns A value in `Some<T>`
   * @throws { ReferenceError }
   * Thrown if the `Option` is `None`
   */
  public abstract unwrap(): T;

  /**
   * Returns the contained `Some<T>` value or a provided default
   * @param defaultValue A default value to return in case the `Option` is `None`
   * @returns A value in `Some<T>` or a default value
   */
  public abstract unwrapOr(defaultValue: T): T;

  /**
   * Inspired from pattern matching patterns
   * @remarks See {@link https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html}
   * @param matcher Object that contains call back function for `Some` and `None`
   * @returns value (or void) from matcher's callback function
   * @example
   * Here's a simple example
   * ```ts
   * const some = new Some(2);
   * const result = some.match({
   *  some: (value) => `Result: ${value}`,
   *  none: () => 'Result: None',
   * });
   *
   * console.log(result); // 'Result: 2'
   * ```
   */
  public abstract match<U>(matcher: Matcher<T, U>): U;

  /**
   * Maps a `Option<T>` to `Option<U>` by applying a callback function that receive contained `Some<T>` value and return a result
   * @param callbackFn - A function that accept contained `Some<T>` value and return a result
   * @returns A `Option<U>` that contains a result of calling callbackFn
   */
  public abstract map<U>(callbackFn: (value: T) => U): Option<U>;

  /**
   * Maps a `Option<T>` to `Option<U>` by applying a callback function that receive contained `Some<T>` value, then flatten the result
   * @param callbackFn - A function that accept contained `Some<T>` value and return a new `Option<U>`
   * @returns A `Option<U>` that contains a result of calling callbackFn and flatten it
   */
  public abstract flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U>;

  /**
   * Catch Maps to `Option<T>` when `Option` is `None`
   * @param callbackFn - A function that return a new `Option<T>`
   * @returns A `Option<T>`
   */
  public abstract catchMap(callbackFn: () => Option<T>): Option<T>;

  /**
   * Returns true if the `Option` is `Some`
   * @returns A boolean
   */
  public abstract isSome(): boolean;

  /**
   * Returns true if the `Option` is `None`
   * @returns A boolean
   */
  public abstract isNone(): boolean;

  /**
   * Inspects contained `Some<T>` value. Do nothing if `Option` is `None`
   * @remarks Uses for development propose only. Should not use for production.
   * @param callbackFn - A function that accept contained `Some<T>` value
   */
  public abstract inspect(callbackFn: (value: T) => void): this;
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

  public inspect(callbackFn: (value: T) => void): this {
    callbackFn(this.value);

    return this;
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

  public inspect(callbackFn: (value: T) => void): this {
    return this;
  }
}
