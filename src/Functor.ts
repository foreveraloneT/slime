export default abstract class Functor<T> {
  public abstract map<U>(callbackFn: (value: T) => U): Functor<U>;

  public abstract unwrap(): T;

  public abstract unwrapOr(value: T): T;
}
