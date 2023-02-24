[slime-wrapper](../README.md) / [Exports](../modules.md) / Wrapper

# Class: Wrapper<T\>

`Wrapper<T>` represents an abstract wrapper class type for wrapping a value

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`Wrapper`**

  ↳ [`Option`](Option-1.md)

  ↳ [`Result`](Result-1.md)

## Table of contents

### Methods

- [flatMap](Wrapper.md#flatmap)
- [inspect](Wrapper.md#inspect)
- [map](Wrapper.md#map)
- [match](Wrapper.md#match)
- [unwrap](Wrapper.md#unwrap)

## Methods

### flatMap

▸ `Abstract` **flatMap**<`U`\>(`callbackFn`): [`Wrapper`](Wrapper.md)<`U`\>

Maps a `Wrapper<T>` to `Wrapper<U>` by applying a callback function that receive contained `Wrapper<T>` value, then flatten the result

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => [`Wrapper`](Wrapper.md)<`U`\> | A function that accept contained `Wrapper<T>` value and return a new `Wrapper<U>` |

#### Returns

[`Wrapper`](Wrapper.md)<`U`\>

A `Wrapper<U>` that contains a result of calling callbackFn and flatten it

#### Defined in

[Wrapper.ts:32](https://github.com/foreveraloneT/slime/blob/main/src/Wrapper.ts#L32)

___

### inspect

▸ `Abstract` **inspect**(`callbackFn`): [`Wrapper`](Wrapper.md)<`T`\>

Inspects contained `Wrapper<T>` value

**`Remarks`**

Uses for development propose only. Should not use for production.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => `void` | A function that accept contained `Wrapper<T>` value |

#### Returns

[`Wrapper`](Wrapper.md)<`T`\>

#### Defined in

[Wrapper.ts:45](https://github.com/foreveraloneT/slime/blob/main/src/Wrapper.ts#L45)

___

### map

▸ `Abstract` **map**<`U`\>(`callbackFn`): [`Wrapper`](Wrapper.md)<`U`\>

Maps a `Wrapper<T>` to `Wrapper<U>` by applying a callback function that receive contained `Wrapper<T>` value and return a result

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => `U` | A function that accept contained `Wrapper<T>` value and return a result |

#### Returns

[`Wrapper`](Wrapper.md)<`U`\>

A `Wrapper<U>` that contains a result of calling callbackFn

#### Defined in

[Wrapper.ts:25](https://github.com/foreveraloneT/slime/blob/main/src/Wrapper.ts#L25)

___

### match

▸ `Abstract` **match**<`U`\>(`matcher`): `U`

Inspired from pattern matching pattern

**`Remarks`**

See [https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html](https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html)

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `matcher` | [`Matcher`](../interfaces/Matcher.md)<`U`\> |

#### Returns

`U`

#### Defined in

[Wrapper.ts:38](https://github.com/foreveraloneT/slime/blob/main/src/Wrapper.ts#L38)

___

### unwrap

▸ `Abstract` **unwrap**(): `T`

Unwraps contained `Wrapper<T>` value.

#### Returns

`T`

A value in `Wrapper<T>`

#### Defined in

[Wrapper.ts:18](https://github.com/foreveraloneT/slime/blob/main/src/Wrapper.ts#L18)
