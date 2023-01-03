/**
 * `Matcher` is an `Object` that contains callback function for pattern matching pattern
 * @remarks See {@link Wrapper.match | `Wrapper<T>.match`}
 */
export interface Matcher<U> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ((value: any) => U) | (() => U);
}

/**
 * `Wrapper<T>` represents an abstract wrapper class type for wrapping a value
 */
export default abstract class Wrapper<T> {
  /**
   * Unwraps contained `Wrapper<T>` value.
   * @returns A value in `Wrapper<T>`
   */
  public abstract unwrap(): T;

  /**
   * Maps a `Wrapper<T>` to `Wrapper<U>` by applying a callback function that receive contained `Wrapper<T>` value and return a result
   * @param callbackFn - A function that accept contained `Wrapper<T>` value and return a result
   * @returns A `Wrapper<U>` that contains a result of calling callbackFn
   */
  public abstract map<U>(callbackFn: (value: T) => U): Wrapper<U>;

  /**
   * Maps a `Wrapper<T>` to `Wrapper<U>` by applying a callback function that receive contained `Wrapper<T>` value, then flatten the result
   * @param callbackFn - A function that accept contained `Wrapper<T>` value and return a new `Wrapper<U>`
   * @returns A `Wrapper<U>` that contains a result of calling callbackFn and flatten it
   */
  public abstract flatMap<U>(callbackFn: (value: T) => Wrapper<U>): Wrapper<U>;

  /**
   * Inspired from pattern matching pattern
   * @remarks See {@link https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html}
  */
  public abstract match<U>(matcher: Matcher<U>): U;

  /**
   * Inspects contained `Wrapper<T>` value
   * @remarks Uses for development propose only. Should not use for production.
   * @param callbackFn - A function that accept contained `Wrapper<T>` value
   */
  public abstract inspect(callbackFn: (value: T) => void): this
}
