export interface Matcher<T, U> {
  [key: string]: ((value: T) => U) | (() => U);
}

export default abstract class Wrapper<T> {
  public abstract unwrap(): T;

  public abstract unwrapOr(value: T): T;

  public abstract map<U>(callbackFn: (value: T) => U): Wrapper<U>;

  public abstract flatMap<U>(callbackFn: (value: T) => Wrapper<U>): Wrapper<U>;

  public abstract match<U>(matcher: Matcher<T, U>): U;
}
