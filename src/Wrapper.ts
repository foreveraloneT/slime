export interface Matcher<U> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ((value: any) => U) | (() => U);
}

export default abstract class Wrapper<T> {
  public abstract unwrap(): T;

  public abstract unwrapOr(value: T): T;

  public abstract map<U>(callbackFn: (value: T) => U): Wrapper<U>;

  public abstract flatMap<U>(callbackFn: (value: T) => Wrapper<U>): Wrapper<U>;

  public abstract catchMap(callbackFn: () => Wrapper<T>): Wrapper<T>;

  public abstract match<U>(matcher: Matcher<U>): U;
}
