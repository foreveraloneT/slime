slime-wrapper / [Exports](modules.md)

# slime-wrapper

## Installation

```sh
npm install --save slime-wrapper
```

## Usage

### `Option<T>`

```ts
import { option } from 'slime-wrapper';

function divide(a: number, b: number): option.Option<number> {
  if (b === 0) return option.none();

  return option.some(a / b);
}

console.log(divide(1.0, 2.0)); // option.Some(0.5)
console.log(divide(1.0, 0)); // option.None

// pattern matching
const result1 = divide(1.0, 2.0)
  .map((val) => val * val)
  .match({
    some: (val) => `Result is: ${val}`,
    none: () => 'Unable to divided by zero',
  });

console.log(result1); // 'Result is: 0.25'

const result2 = divide(1.0, 0.0)
  .map((val) => val * val)
  .match({
    some: (val) => `Result is: ${val}`,
    none: () => 'Unable to divided by zero',
  });

console.log(result2) // 'Unable to divided by zero'
```

### `Result<T, E>`

```ts
import { result } from 'slime-wrapper';

const fakeData = [
  'Goku',
  'Vegeta',
  'Broly',
];

function getById(id: number): result.Result<string, number> {
  const data = fakeData.at(id);

  if (!data) return result.err(404);

  return result.ok(data);
}

console.log(getById(0)); // result.Ok("Goku")
console.log(getById(1)); // result.Ok("Vegeta")
console.log(getById(4)); // result.Err(404)

// pattern matching
const result1 = getById(2).match({
  ok: (value) => `Result: ${value}`,
  err: (val) => `Error code: ${val}`,
})

console.log(result1) // Result: Broly

const result2 = getById(777).match({
  ok: (value) => `Result: ${value}`,
  err: (val) => `Error code: ${val}`,
})

console.log(result2) // 'Error code: 404'
```

## API Docs

[Full API Documentation](docs/modules.md)

## License

See [LICENSE](LICENSE)
