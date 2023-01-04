[slime-wrapper](../README.md) / [Exports](../modules.md) / result

# Namespace: result

## Table of contents

### Functions

- [err](result.md#err)
- [from](result.md#from)
- [fromPromise](result.md#frompromise)
- [ok](result.md#ok)

## Functions

### err

▸ **err**<`T`, `E`\>(`value`): `Err`<`T`, `E`\>

Wraps value with `Err<T, E>`

**`Throws`**

Thrown if value is one of `undefined`, `NaN` or `null`

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `E` | A value need to be wrapped by `Err<T, E>` |

#### Returns

`Err`<`T`, `E`\>

Returns `Err<T, E>`

#### Defined in

[utils/result.ts:34](https://github.com/foreveraloneT/slime/blob/f365186/src/utils/result.ts#L34)

___

### from

▸ **from**<`T`\>(`value?`): [`Result`](../classes/Result-1.md)<`T`, `Error`\>

Wraps value with `Result<T,Error>`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value?` | `T` | A value need to be wrapped by `Result<T,E>` |

#### Returns

[`Result`](../classes/Result-1.md)<`T`, `Error`\>

Returns `Ok<T,Error>` if value is not one of `undefined`, `NaN` or `null`.
Otherwise, return `Err<T,Error>`

#### Defined in

[utils/result.ts:11](https://github.com/foreveraloneT/slime/blob/f365186/src/utils/result.ts#L11)

___

### fromPromise

▸ **fromPromise**<`T`\>(`promise`): `Promise`<[`Result`](../classes/Result-1.md)<`T`, `Error`\>\>

Wraps a result of `Promise<T>` with `Result<T, Error>`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise` | `Promise`<`T`\> | A promise |

#### Returns

`Promise`<[`Result`](../classes/Result-1.md)<`T`, `Error`\>\>

Promise of `Ok<T, Error>` if Promise is resolved. If it rejected, returns `Err<T, Error>`

#### Defined in

[utils/result.ts:43](https://github.com/foreveraloneT/slime/blob/f365186/src/utils/result.ts#L43)

___

### ok

▸ **ok**<`T`, `E`\>(`value`): `Ok`<`T`, `E`\>

Wraps value with `Ok<T, E>`

**`Throws`**

Thrown if value is one of `undefined`, `NaN` or `null`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | `Error` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | A value need to be wrapped by `Ok<T, E>` |

#### Returns

`Ok`<`T`, `E`\>

Returns `Ok<T, E>`

#### Defined in

[utils/result.ts:24](https://github.com/foreveraloneT/slime/blob/f365186/src/utils/result.ts#L24)
