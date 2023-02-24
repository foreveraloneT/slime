[slime-wrapper](../README.md) / [Exports](../modules.md) / Result

# Class: Result<T, E\>

`Result<T, E>` represents either success (`Ok<T, E>`) or failure (`Err<T, E>`)

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | `Error` |

## Hierarchy

- [`Wrapper`](Wrapper.md)<`T`\>

  ↳ **`Result`**

## Table of contents

### Methods

- [catchMap](Result-1.md#catchmap)
- [err](Result-1.md#err)
- [flatMap](Result-1.md#flatmap)
- [flatMapErr](Result-1.md#flatmaperr)
- [inspect](Result-1.md#inspect)
- [inspectErr](Result-1.md#inspecterr)
- [isErr](Result-1.md#iserr)
- [isOk](Result-1.md#isok)
- [map](Result-1.md#map)
- [mapErr](Result-1.md#maperr)
- [match](Result-1.md#match)
- [ok](Result-1.md#ok)
- [unwrap](Result-1.md#unwrap)
- [unwrapErr](Result-1.md#unwraperr)
- [unwrapErrOr](Result-1.md#unwraperror)
- [unwrapOr](Result-1.md#unwrapor)

## Methods

### catchMap

▸ `Abstract` **catchMap**(`callbackFn`): [`Result`](Result-1.md)<`T`, `E`\>

Catch Maps to `Result<T, E>` when `Result` is `None`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | () => [`Result`](Result-1.md)<`T`, `E`\> | A function that return a new `Result<T, E>` |

#### Returns

[`Result`](Result-1.md)<`T`, `E`\>

A `Result<T, E>`

#### Defined in

[Result.ts:98](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L98)

___

### err

▸ `Abstract` **err**(): [`Option`](Option-1.md)<`E`\>

Converts from `Result<T, E>` to [`Option<E>`](Option-1.md).

**`Example`**

Here's a simple example
```ts
const ok = new Ok<string, number>('Success');
const err = new Err<string, number>(404);

console.log(ok.err()); // None
console.log(err.err()); // Some(404)
```

#### Returns

[`Option`](Option-1.md)<`E`\>

Returns `Some<T>` with contained `Err<T, E>` value. Otherwise returns `None`
*

#### Defined in

[Result.ts:140](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L140)

___

### flatMap

▸ `Abstract` **flatMap**<`U`\>(`callbackFn`): [`Result`](Result-1.md)<`U`, `E`\>

Maps a `Result<T, E>` to `Result<U, E>` by applying a callback function that receive contained `Ok<T, E>` value, then flatten the result

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => [`Result`](Result-1.md)<`U`, `E`\> | A function that accept contained `Ok<T, E>` value and return a new `Result<U, E>` |

#### Returns

[`Result`](Result-1.md)<`U`, `E`\>

A `Result<U, E>` that contains a result of calling callbackFn and flatten it

#### Overrides

[Wrapper](Wrapper.md).[flatMap](Wrapper.md#flatmap)

#### Defined in

[Result.ts:84](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L84)

___

### flatMapErr

▸ `Abstract` **flatMapErr**<`U`\>(`callbackFn`): [`Result`](Result-1.md)<`T`, `U`\>

Maps a `Result<T, E>` to `Result<T, U>` by applying a callback function that receive contained `Err<T, E>` value, then flatten the result

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `E`) => [`Result`](Result-1.md)<`T`, `U`\> | A function that accept contained `Err<T, E>` value and return a new `Result<T, U>` |

#### Returns

[`Result`](Result-1.md)<`T`, `U`\>

A `Result<T, U>` that contains a result of calling callbackFn and flatten it

#### Defined in

[Result.ts:91](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L91)

___

### inspect

▸ `Abstract` **inspect**(`callbackFn`): [`Result`](Result-1.md)<`T`, `E`\>

Inspects contained `Ok<T, E>` value. Do nothing if `Result` is `Err`

**`Remarks`**

Uses for development propose only. Should not use for production.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => `void` | A function that accept contained `Ok<T, E>` value |

#### Returns

[`Result`](Result-1.md)<`T`, `E`\>

#### Overrides

[Wrapper](Wrapper.md).[inspect](Wrapper.md#inspect)

#### Defined in

[Result.ts:147](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L147)

___

### inspectErr

▸ `Abstract` **inspectErr**(`callbackFn`): [`Result`](Result-1.md)<`T`, `E`\>

Inspects contained `Err<T, E>` value. Do nothing if `Result` is `Ok`

**`Remarks`**

Uses for development propose only. Should not use for production.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `E`) => `void` | A function that accept contained `Err<T, E>` value |

#### Returns

[`Result`](Result-1.md)<`T`, `E`\>

#### Defined in

[Result.ts:154](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L154)

___

### isErr

▸ `Abstract` **isErr**(): `boolean`

Returns true if the `Result` is `Err`

#### Returns

`boolean`

A boolean

#### Defined in

[Result.ts:110](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L110)

___

### isOk

▸ `Abstract` **isOk**(): `boolean`

Returns true if the `Result` is `Ok`

#### Returns

`boolean`

A boolean

#### Defined in

[Result.ts:104](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L104)

___

### map

▸ `Abstract` **map**<`U`\>(`callbackFn`): [`Result`](Result-1.md)<`U`, `E`\>

Maps a `Result<T, E>` to `Result<U, E>` by applying a callback function that receive contained `Ok<T, E>` value and return a result, Leave an `Err<T, E>` untouched

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => `U` | A function that accept contained `Ok<T, E>` value and return a result |

#### Returns

[`Result`](Result-1.md)<`U`, `E`\>

A `Result<U, E>` that contains a result of calling callbackFn

#### Overrides

[Wrapper](Wrapper.md).[map](Wrapper.md#map)

#### Defined in

[Result.ts:70](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L70)

___

### mapErr

▸ `Abstract` **mapErr**<`U`\>(`callbackFn`): [`Result`](Result-1.md)<`T`, `U`\>

Maps a `Result<T, E>` to `Result<T, U>` by applying a callback function that receive contained `Err<T, E>` value and return a result, Leave an `Ok<T, E>` untouched

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `E`) => `U` | A function that accept contained `Err<T, E>` value and return a result |

#### Returns

[`Result`](Result-1.md)<`T`, `U`\>

A `Result<T, U>` that contains a result of calling callbackFn

#### Defined in

[Result.ts:77](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L77)

___

### match

▸ `Abstract` **match**<`U`\>(`matcher`): `U`

Inspired from pattern matching patterns

**`Remarks`**

See [https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html](https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html)

**`Example`**

Here's a simple example
```ts
const ok = new Ok<number, Error>(2);
const result = ok.match({
 ok: (value) => `Result: ${value}`,
 err: (value) => `Error: ${error.message}`,
});

console.log(result); // 'Result: 2'
```

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matcher` | `Matcher`<`T`, `E`, `U`\> | Object that contains call back function for `Some` and `None` |

#### Returns

`U`

value (or void) from matcher's callback function

#### Overrides

[Wrapper](Wrapper.md).[match](Wrapper.md#match)

#### Defined in

[Result.ts:63](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L63)

___

### ok

▸ `Abstract` **ok**(): [`Option`](Option-1.md)<`T`\>

Converts from `Result<T, E>` to [`Option<T>`](Option-1.md).

**`Example`**

Here's a simple example
```ts
const ok = new Ok<string, number>('Success');
const err = new Err<string, number>(404);

console.log(ok.ok()); // Some('Success')
console.log(err.ok()); // None
```

#### Returns

[`Option`](Option-1.md)<`T`\>

Returns `Some<T>` with contained `Ok<T, E>` value. Otherwise returns `None`

#### Defined in

[Result.ts:125](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L125)

___

### unwrap

▸ `Abstract` **unwrap**(): `T`

Unwraps contained `Ok<T, E>` value. Throws error if the `Result` is `Err`

**`Throws`**

Thrown if the `Result` is `Err`

#### Returns

`T`

A value in `Ok<T, E>`

#### Overrides

[Wrapper](Wrapper.md).[unwrap](Wrapper.md#unwrap)

#### Defined in

[Result.ts:22](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L22)

___

### unwrapErr

▸ `Abstract` **unwrapErr**(): `E`

Unwraps contained `Err<T, E>` value. Throws error if the `Result` is `Ok`

**`Throws`**

Thrown if the `Result` is `Ok`

#### Returns

`E`

A value in `Err<T, E>`

#### Defined in

[Result.ts:37](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L37)

___

### unwrapErrOr

▸ `Abstract` **unwrapErrOr**(`defaultValue`): `E`

Returns the contained `Err<T, E>` value or a provided default

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultValue` | `E` | A default value to return in case the `Result` is `Ok` |

#### Returns

`E`

A value in `Err<T, E>` or a default value

#### Defined in

[Result.ts:44](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L44)

___

### unwrapOr

▸ `Abstract` **unwrapOr**(`defaultValue`): `T`

Returns the contained `Ok<T, E>` value or a provided default

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultValue` | `T` | A default value to return in case the `Result` is `Err` |

#### Returns

`T`

A value in `Ok<T, E>` or a default value

#### Defined in

[Result.ts:29](https://github.com/foreveraloneT/slime/blob/main/src/Result.ts#L29)
