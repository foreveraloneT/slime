import Functor from '@/Functor';

export default abstract class Applicative<T> extends Functor<T> {
  public abstract ap<U>(apCb: Applicative<(value: T) => U>): Applicative<U>;
}
