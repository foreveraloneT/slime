[slime-wrapper](../README.md) / [Exports](../modules.md) / Option

# Class: Option<T\>

`Option<T>` represents an optional value. Every `Option<T>` is either `Some<T>` and contains a value,
or `None<T>` which represents an empty value (`undefined`, `NaN`, `null`)

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Wrapper`](Wrapper.md)<`T`\>

  ↳ **`Option`**

## Table of contents

### Methods

- [catchMap](Option-1.md#catchmap)
- [flatMap](Option-1.md#flatmap)
- [inspect](Option-1.md#inspect)
- [isNone](Option-1.md#isnone)
- [isSome](Option-1.md#issome)
- [map](Option-1.md#map)
- [match](Option-1.md#match)
- [unwrap](Option-1.md#unwrap)
- [unwrapOr](Option-1.md#unwrapor)

## Methods

### catchMap

▸ `Abstract` **catchMap**(`callbackFn`): [`Option`](Option-1.md)<`T`\>

Catch Maps to `Option<T>` when `Option` is `None`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | () => [`Option`](Option-1.md)<`T`\> | A function that return a new `Option<T>` |

#### Returns

[`Option`](Option-1.md)<`T`\>

A `Option<T>`

#### Defined in

[Option.ts:69](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L69)

___

### flatMap

▸ `Abstract` **flatMap**<`U`\>(`callbackFn`): [`Option`](Option-1.md)<`U`\>

Maps a `Option<T>` to `Option<U>` by applying a callback function that receive contained `Some<T>` value, then flatten the result

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => [`Option`](Option-1.md)<`U`\> | A function that accept contained `Some<T>` value and return a new `Option<U>` |

#### Returns

[`Option`](Option-1.md)<`U`\>

A `Option<U>` that contains a result of calling callbackFn and flatten it

#### Overrides

[Wrapper](Wrapper.md).[flatMap](Wrapper.md#flatmap)

#### Defined in

[Option.ts:62](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L62)

___

### inspect

▸ `Abstract` **inspect**(`callbackFn`): [`Option`](Option-1.md)<`T`\>

Inspects contained `Some<T>` value. Do nothing if `Option` is `None`

**`Remarks`**

Uses for development propose only. Should not use for production.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => `void` | A function that accept contained `Some<T>` value |

#### Returns

[`Option`](Option-1.md)<`T`\>

#### Overrides

[Wrapper](Wrapper.md).[inspect](Wrapper.md#inspect)

#### Defined in

[Option.ts:88](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L88)

___

### isNone

▸ `Abstract` **isNone**(): `boolean`

Returns true if the `Option` is `None`

#### Returns

`boolean`

A boolean

#### Defined in

[Option.ts:81](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L81)

___

### isSome

▸ `Abstract` **isSome**(): `boolean`

Returns true if the `Option` is `Some`

#### Returns

`boolean`

A boolean

#### Defined in

[Option.ts:75](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L75)

___

### map

▸ `Abstract` **map**<`U`\>(`callbackFn`): [`Option`](Option-1.md)<`U`\>

Maps a `Option<T>` to `Option<U>` by applying a callback function that receive contained `Some<T>` value and return a result

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackFn` | (`value`: `T`) => `U` | A function that accept contained `Some<T>` value and return a result |

#### Returns

[`Option`](Option-1.md)<`U`\>

A `Option<U>` that contains a result of calling callbackFn

#### Overrides

[Wrapper](Wrapper.md).[map](Wrapper.md#map)

#### Defined in

[Option.ts:55](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L55)

___

### match

▸ `Abstract` **match**<`U`\>(`matcher`): `U`

Inspired from pattern matching patterns

**`Remarks`**

See [https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html](https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html)

**`Example`**

Here's a simple example
```ts
const some = new Some(2);
const result = some.match({
 some: (value) => `Result: ${value}`,
 none: () => 'Result: None',
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
| `matcher` | `Matcher`<`T`, `U`\> | Object that contains call back function for `Some` and `None` |

#### Returns

`U`

value (or void) from matcher's callback function

#### Overrides

[Wrapper](Wrapper.md).[match](Wrapper.md#match)

#### Defined in

[Option.ts:48](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L48)

___

### unwrap

▸ `Abstract` **unwrap**(): `T`

Unwraps contained `Some<T>` value. Throws error if the `Option` is `None`

**`Throws`**

Thrown if the `Option` is `None`

#### Returns

`T`

A value in `Some<T>`

#### Overrides

[Wrapper](Wrapper.md).[unwrap](Wrapper.md#unwrap)

#### Defined in

[Option.ts:22](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L22)

___

### unwrapOr

▸ `Abstract` **unwrapOr**(`defaultValue`): `T`

Returns the contained `Some<T>` value or a provided default

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultValue` | `T` | A default value to return in case the `Option` is `None` |

#### Returns

`T`

A value in `Some<T>` or a default value

#### Defined in

[Option.ts:29](https://github.com/foreveraloneT/slime/blob/f365186/src/Option.ts#L29)
