import Applicative from '@/Applicative';

export default abstract class Monad<T> extends Applicative<T> {
  public abstract flatMap<U>(callbackFn: (value: T) => Monad<U>): Monad<U>;
}
