import * as option from '../utils/option';

describe('Option', () => {
  describe('Option.Some', () => {
    it('can not initiate with undefined', () => {
      expect(() => new option.Some(undefined)).toThrowError();
    });

    it('can not initiate with NaN', () => {
      expect(() => new option.Some(NaN)).toThrowError();
    });

    it('can not initiate with null', () => {
      expect(() => new option.Some(null)).toThrowError();
    });
  });

  describe('unwrap', () => {
    it('should unwrap the value in the Option.Some', () => {
      const val = option.from('something');

      expect(val.unwrap()).toBe('something');
    });

    it('should throw error when try to unwrap Option.None', () => {
      const val = option.none<string>();

      expect(val.unwrap).toThrowError(ReferenceError);
    });
  });

  describe('unwrapOr', () => {
    it('should unwrap the value in the Option.Some', () => {
      const val = option.from('something');

      expect(val.unwrapOr('else')).toBe('something');
    });

    it('should return default value when unwrapping Option.None', () => {
      const val = option.none<string>();

      expect(val.unwrapOr('else')).toBe('else');
    });
  });

  describe('match', () => {
    it('should call the `some` callback when matching Option.Some', () => {
      const val = option.from('something');

      const some = jest.fn().mockImplementation((value: string) => `match some: ${value}`);
      const none = jest.fn().mockReturnValue('match none');

      const result = val.match({ some, none });

      expect(result).toBe('match some: something');
      expect(some).toBeCalledWith('something');
      expect(none).not.toBeCalled();
    });

    it('should call the `none` callback when matching Option.None', () => {
      const val = option.none<string>();

      const some = jest.fn().mockImplementation((value: string) => `match some: ${value}`);
      const none = jest.fn().mockReturnValue('match none');

      const result = val.match({ some, none });

      expect(result).toBe('match none');
      expect(none).toBeCalled();
      expect(some).not.toBeCalled();
    });
  });

  describe('map', () => {
    it('should work correctly when it is Option.Some', () => {
      const val = option.from('something');

      const expected = val.map((i) => i.length)
        .map((i) => i * i)
        .unwrapOr(-1);

      expect(expected).toBe(81);
    });

    it('should map to Option.None when is is Option.None', () => {
      const val = option.none<number>();

      const expected = val.map((i) => i * i).unwrapOr(-1);

      expect(expected).toBe(-1);
    });
  });

  describe('flatMap', () => {
    it('should work correctly when it is Option.Some', () => {
      const val = option.from('something');

      const expected = val.map((i) => i.length)
        .flatMap((i) => option.from(i * i))
        .unwrapOr(-1);

      expect(expected).toBe(81);
    });

    it('can map to Option.None for flatMap Option.Some', () => {
      const val = option.from(0);

      const expected = val.flatMap((i) => option.from(i / 0))
        .unwrapOr(-1);

      expect(expected).toBe(-1);
    });

    it('should flatMap to Option.None when is is Option.None', () => {
      const val = option.none<number>();

      const expected = val.flatMap((i) => option.from(i * i)).unwrapOr(-1);

      expect(expected).toBe(-1);
    });
  });

  describe('catchMap', () => {
    it('should map to the same contained value in Option.Some', () => {
      const val = option.from('something');

      const expected = val.map((i) => i.length)
        .catchMap(() => option.from(999))
        .unwrapOr(-1);

      expect(expected).toBe(9);
    });

    it('should map to Option value from the callback in Option.None', () => {
      const val = option.none<string>();

      const expected = val.map((i) => i.length)
        .catchMap(() => option.from(999))
        .unwrapOr(-1);

      expect(expected).toBe(999);
    });
  });

  describe('isSome', () => {
    it('should return `true` for Option.Some', () => {
      expect(option.from(0).isSome()).toBe(true);
    });

    it('should return `false` for Option.None', () => {
      expect(option.from(NaN).isSome()).toBe(false);
    });
  });

  describe('isNone', () => {
    it('should return `false` for Option.Some', () => {
      expect(option.from(0).isNone()).toBe(false);
    });

    it('should return `true` for Option.None', () => {
      expect(option.from(NaN).isNone()).toBe(true);
    });
  });

  describe('inspect', () => {
    it('should call callback function for Option.Some', () => {
      const cb = jest.fn();

      const result = option.from(0)
        .inspect(cb)
        .map((i) => i + 1)
        .unwrapOr(-1);

      expect(cb).toHaveBeenCalledWith(0);
      expect(result).toBe(1);
    });

    it('should not call callback function for Option.None', () => {
      const cb = jest.fn();

      const result = option.from(NaN)
        .inspect(cb)
        .map((i) => i / 1)
        .unwrapOr(-1);

      expect(cb).not.toBeCalled();
      expect(result).toBe(-1);
    });
  });
});
