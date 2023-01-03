interface Matcher$2<U> {
    [key: string]: ((value: any) => U) | (() => U);
}
declare abstract class Wrapper<T> {
    abstract unwrap(): T;
    abstract unwrapOr(value: T): T;
    abstract map<U>(callbackFn: (value: T) => U): Wrapper<U>;
    abstract flatMap<U>(callbackFn: (value: T) => Wrapper<U>): Wrapper<U>;
    abstract catchMap(callbackFn: () => Wrapper<T>): Wrapper<T>;
    abstract match<U>(matcher: Matcher$2<U>): U;
}

interface Matcher$1<T, U> extends Matcher$2<U> {
    some: (value: T) => U;
    none: () => U;
}
declare abstract class Option<T> extends Wrapper<T> {
    abstract match<U>(matcher: Matcher$1<T, U>): U;
    abstract map<U>(callbackFn: (value: T) => U): Option<U>;
    abstract flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U>;
    abstract isSome(): boolean;
    abstract isNone(): boolean;
}
declare class Some<T> extends Option<T> {
    private readonly value;
    constructor(value: T);
    isSome(): boolean;
    isNone(): boolean;
    match<U>(matcher: Matcher$1<T, U>): U;
    map<U>(callbackFn: (value: T) => U): Some<U>;
    flatMap<U>(callbackFn: (value: T) => Option<U>): Option<U>;
    catchMap(callbackFn: () => Some<T>): Some<T>;
    unwrap(): T;
    unwrapOr(value: T): T;
}
declare class None<T> extends Option<T> {
    isSome(): boolean;
    isNone(): boolean;
    match<U>(matcher: Matcher$1<T, U>): U;
    map<U>(callbackFn: (value: T) => U): None<U>;
    flatMap<U>(callbackFn: (value: T) => Option<U>): None<U>;
    catchMap(callbackFn: () => Option<T>): Option<T>;
    unwrap(): T;
    unwrapOr(value: T): T;
}

interface Matcher<T1, T2, U> extends Matcher$2<U> {
    ok: (value: T1) => U;
    err: (value: T2) => U;
}
declare abstract class Result<T1, T2 = Error> extends Wrapper<T1> {
    abstract unwrapErr(): T2;
    abstract unwrapErrOr(value: T2): T2;
    abstract match<U>(matcher: Matcher<T1, T2, U>): U;
    abstract map<U>(callbackFn: (value: T1) => U): Result<U, T2>;
    abstract mapErr<U>(callbackFn: (value: T2) => U): Result<T1, U>;
    abstract flatMap<U>(callbackFn: (value: T1) => Result<U, T2>): Result<U, T2>;
    abstract flatMapErr<U>(callbackFn: (value: T2) => Result<T1, U>): Result<T1, U>;
    abstract isOk(): boolean;
    abstract isErr(): boolean;
}
declare class Ok<T1, T2> extends Result<T1, T2> {
    private readonly value;
    constructor(value: T1);
    unwrap(): T1;
    unwrapOr(value: T1): T1;
    unwrapErr(): T2;
    unwrapErrOr(value: T2): T2;
    match<U>(matcher: Matcher<T1, T2, U>): U;
    map<U>(callbackFn: (value: T1) => U): Ok<U, T2>;
    mapErr<U>(callbackFn: (value: T2) => U): Ok<T1, U>;
    flatMap<U>(callbackFn: (value: T1) => Result<U, T2>): Result<U, T2>;
    flatMapErr<U>(callbackFn: (value: T2) => Result<T1, U>): Result<T1, U>;
    catchMap(callbackFn: () => Result<T1, T2>): Ok<T1, T2>;
    isOk(): boolean;
    isErr(): boolean;
}
declare class Err<T1, T2> extends Result<T1, T2> {
    private readonly value;
    constructor(value: T2);
    unwrap(): T1;
    unwrapOr(value: T1): T1;
    unwrapErr(): T2;
    unwrapErrOr(value: T2): T2;
    match<U>(matcher: Matcher<T1, T2, U>): U;
    map<U>(callbackFn: (value: T1) => U): Err<U, T2>;
    mapErr<U>(callbackFn: (value: T2) => U): Err<T1, U>;
    flatMap<U>(callbackFn: (value: T1) => Result<U, T2>): Err<U, T2>;
    flatMapErr<U>(callbackFn: (value: T2) => Result<T1, U>): Result<T1, U>;
    catchMap(callbackFn: () => Result<T1, T2>): Result<T1, T2>;
    isOk(): boolean;
    isErr(): boolean;
}

declare function from$1<T>(value: T): Option<T>;
declare function some<T>(value: T): Some<T>;
declare function none<T>(): None<T>;
declare function fromPromise$1<T>(promise: Promise<T>): Promise<Option<T>>;

type option_Option<T> = Option<T>;
declare const option_Option: typeof Option;
type option_Some<T> = Some<T>;
declare const option_Some: typeof Some;
type option_None<T> = None<T>;
declare const option_None: typeof None;
declare const option_some: typeof some;
declare const option_none: typeof none;
declare namespace option {
  export {
    option_Option as Option,
    option_Some as Some,
    option_None as None,
    from$1 as from,
    option_some as some,
    option_none as none,
    fromPromise$1 as fromPromise,
  };
}

declare function from<T>(value: T): Result<T, Error>;
declare function ok<T1, T2>(value: T1): Ok<T1, T2>;
declare function err<T1, T2>(value: T2): Err<T1, T2>;
declare function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>>;

type result_Result<T1, T2 = Error> = Result<T1, T2>;
declare const result_Result: typeof Result;
type result_Ok<T1, T2> = Ok<T1, T2>;
declare const result_Ok: typeof Ok;
type result_Err<T1, T2> = Err<T1, T2>;
declare const result_Err: typeof Err;
declare const result_from: typeof from;
declare const result_ok: typeof ok;
declare const result_err: typeof err;
declare const result_fromPromise: typeof fromPromise;
declare namespace result {
  export {
    result_Result as Result,
    result_Ok as Ok,
    result_Err as Err,
    result_from as from,
    result_ok as ok,
    result_err as err,
    result_fromPromise as fromPromise,
  };
}

export { Err, None, Ok, Option, Result, Some, Wrapper, option, result };
