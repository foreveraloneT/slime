[slime-wrapper](../README.md) / [Exports](../modules.md) / option

# Namespace: option

## Table of contents

### Functions

- [from](option.md#from)
- [fromPromise](option.md#frompromise)
- [none](option.md#none)
- [some](option.md#some)

## Functions

### from

▸ **from**<`T`\>(`value?`): [`Option`](../classes/Option-1.md)<`T`\>

Wraps value with `Option<T>`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value?` | `T` | A value need to be wrapped by `Option<T>` |

#### Returns

[`Option`](../classes/Option-1.md)<`T`\>

Returns `Some<T>` if value is not one of `undefined`, `NaN` or `null`.
Otherwise, return `None`

#### Defined in

[utils/option.ts:11](https://github.com/foreveraloneT/slime/blob/main/src/utils/option.ts#L11)

___

### fromPromise

▸ **fromPromise**<`T`\>(`promise`): `Promise`<[`Option`](../classes/Option-1.md)<`T`\>\>

Wraps a result of `Promise<T>` with `Option<T>`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise` | `Promise`<`T`\> | A promise |

#### Returns

`Promise`<[`Option`](../classes/Option-1.md)<`T`\>\>

Promise of `Some<T>` if Promise is resolved. If it rejected, returns `None`

#### Defined in

[utils/option.ts:41](https://github.com/foreveraloneT/slime/blob/main/src/utils/option.ts#L41)

___

### none

▸ **none**<`T`\>(): `None`<`T`\>

Initiates `None`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`None`<`T`\>

Returns `None<T>`

#### Defined in

[utils/option.ts:32](https://github.com/foreveraloneT/slime/blob/main/src/utils/option.ts#L32)

___

### some

▸ **some**<`T`\>(`value`): `Some`<`T`\>

Wraps value with `Some<T>`

**`Throws`**

Thrown if value is one of `undefined`, `NaN` or `null`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | A value need to be wrapped by `Some<T>` |

#### Returns

`Some`<`T`\>

Returns `Some<T>`

#### Defined in

[utils/option.ts:24](https://github.com/foreveraloneT/slime/blob/main/src/utils/option.ts#L24)
