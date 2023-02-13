import * as result from '../utils/result';

describe('Result', () => {
  describe('Result.Ok', () => {
    it('can not initiate with undefined', () => {
      expect(() => new result.Ok(undefined)).toThrowError();
    });

    it('can not initiate with NaN', () => {
      expect(() => new result.Ok(NaN)).toThrowError();
    });

    it('can not initiate with null', () => {
      expect(() => new result.Ok(null)).toThrowError();
    });
  });

  describe('Result.Err', () => {
    it('can not initiate with undefined', () => {
      expect(() => new result.Err(undefined)).toThrowError();
    });

    it('can not initiate with NaN', () => {
      expect(() => new result.Err(NaN)).toThrowError();
    });

    it('can not initiate with null', () => {
      expect(() => new result.Err(null)).toThrowError();
    });
  });

  describe('unwrap', () => {
    it('should unwrap the value in the Result.Ok', () => {
      const val = result.from('something');

      expect(val.unwrap()).toBe('something');
    });

    it('should throw error when try to unwrap Result.err', () => {
      const val = result.err<string, Error>(new Error('error'));

      expect(val.unwrap).toThrowError(ReferenceError);
    });
  });

  describe('unwrapErr', () => {
    it('should unwrap the value in the Result.Err', () => {
      const val = result.err<string, Error>(new Error('error'));

      expect(val.unwrapErr().message).toBe('error');
    });

    it('should throw error when try to unwrap Result.Ok', () => {
      const val = result.from('something');

      expect(val.unwrapErr).toThrowError(ReferenceError);
    });
  });

  describe('unwrapOr', () => {
    it('should unwrap the value in the Result.Ok', () => {
      const val = result.err<string, Error>(new Error('error'));

      expect(val.unwrapErrOr(new Error('nothing')).message).toBe('error');
    });

    it('should return default value when unwrapping Result.Err', () => {
      const val = result.from('something');

      expect(val.unwrapErrOr(new Error('nothing')).message).toBe('nothing');
    });
  });

  describe('unwrapErrOr', () => {
    it('should unwrap the value in the Result.Err', () => {
      const val = result.from('something');

      expect(val.unwrapOr('else')).toBe('something');
    });

    it('should return default value when unwrapping Result.Ok', () => {
      const val = result.err<string, Error>(new Error('error'));

      expect(val.unwrapOr('else')).toBe('else');
    });
  });

  describe('match', () => {
    it('should call the `Ok` callback when matching Result.Ok', () => {
      const val = result.from('something');

      const ok = jest.fn().mockImplementation((value: string) => `match ok: ${value}`);
      const err = jest.fn().mockImplementation((error: Error) => `match err: ${error.toString()}`);

      const response = val.match({ ok, err });

      expect(response).toBe('match ok: something');
      expect(ok).toBeCalledWith('something');
      expect(err).not.toBeCalled();
    });

    it('should call the `none` callback when matching Result.Err', () => {
      const mockError = new Error('error');
      const val = result.err<string, Error>(mockError);

      const ok = jest.fn().mockImplementation((value: string) => `match ok: ${value}`);
      const err = jest.fn().mockImplementation((error: Error) => `match err: ${error.message}`);

      const response = val.match({ ok, err });

      expect(response).toBe('match err: error');
      expect(ok).not.toBeCalled();
      expect(err).toBeCalledWith(mockError);
    });
  });

  describe('map', () => {
    it('should work correctly when it is Result.Ok', () => {
      const val = result.from('something');

      const expected = val.map((i) => i.length)
        .map((i) => i * i)
        .unwrapOr(-1);

      expect(expected).toBe(81);
    });

    it('should map to Result.Err when is is Result.Err', () => {
      const val = result.err<number, Error>(new Error('error'));

      const expected = val.map((i) => i * i).unwrapOr(-1);

      expect(expected).toBe(-1);
    });
  });

  describe('mapErr', () => {
    it('should work correctly when it is Result.Err', () => {
      const val = result.err<number, Error>(new Error('error'));

      const expected = val.mapErr((err) => err.message)
        .unwrapErrOr('nothing');

      expect(expected).toBe('error');
    });

    it('should map to Result.Ok when is is Result.Ok', () => {
      const val = result.from('something');

      const expected = val.mapErr((err) => err.message).unwrapErrOr('nothing');

      expect(expected).toBe('nothing');
    });
  });

  describe('flatMap', () => {
    it('should work correctly when it is Result.Ok', () => {
      const val = result.from('something');

      const expected = val.map((i) => i.length)
        .flatMap((i) => result.from(i * i))
        .unwrapOr(-1);

      expect(expected).toBe(81);
    });

    it('can map to Result.Err for flatMap Result.Ok', () => {
      const val = result.from(0);

      const expected = val.flatMap((i) => result.from(i / 0))
        .unwrapOr(-1);

      expect(expected).toBe(-1);
    });

    it('should flatMap to Result.Err with the same contained value when it is Result.Err', () => {
      const val = result.err<number, Error>(new Error('hello'));

      const expected = val.flatMap((i) => result.from(i * i)).unwrapOr(-1);

      expect(expected).toBe(-1);
    });
  });

  describe('flatMapErr', () => {
    it('should work correctly when it is Result.Err', () => {
      const val = result.err<number, Error>(new Error('error'));

      const expected = val.flatMapErr((err) => result.err(new Error(`new ${err.message}`)))
        .unwrapErrOr(new Error('nothing'));

      expect(expected.message).toBe('new error');
    });

    it('can map to Result.Ok for flatMapErr Result.Err', () => {
      const val = result.err<string, Error>(new Error('error string'));

      const expected = val.flatMapErr((err) => result.from(err.message))
        .unwrapOr('else');

      expect(expected).toBe('error string');
    });

    it('should flatMapErr to Result.Ok with the same contained value when it is Result.Ok', () => {
      const val = result.from('ok');

      const expected = val.flatMapErr((err) => result.from(err.message))
        .unwrapOr('else');

      expect(expected).toBe('ok');
    });
  });

  describe('catchMap', () => {
    it('should map to the same contained value in Result.Ok', () => {
      const val = result.from('something');

      const expected = val.map((i) => i.length)
        .catchMap(() => result.from(999))
        .unwrapOr(-1);

      expect(expected).toBe(9);
    });

    it('should map to Result value from the callback in Result.Err', () => {
      const val = result.err<string, Error>(new Error('error'));

      const expected = val.map((i) => i.length)
        .catchMap(() => result.from(999))
        .unwrapOr(-1);

      expect(expected).toBe(999);
    });
  });

  describe('isOk', () => {
    it('should return `true` for Result.Ok', () => {
      expect(result.from(0).isOk()).toBe(true);
    });

    it('should return `false` for Result.Err', () => {
      expect(result.from(NaN).isOk()).toBe(false);
    });
  });

  describe('isErr', () => {
    it('should return `false` for Result.Ok', () => {
      expect(result.from(0).isErr()).toBe(false);
    });

    it('should return `true` for Result.Err', () => {
      expect(result.from(NaN).isErr()).toBe(true);
    });
  });

  describe('ok', () => {
    it('should return Option.Some with contained value for Result.Ok', () => {
      const val = result.from('something');

      const expected = val.ok();

      expect(expected.isSome()).toBe(true);
      expect(expected.unwrapOr('else')).toBe('something');
    });

    it('should return Option.None for Result.Err', () => {
      const val = result.from(NaN);

      const expected = val.ok();

      expect(expected.isNone()).toBe(true);
    });
  });

  describe('err', () => {
    it('should return Option.None for Result.Ok', () => {
      const val = result.from('something');

      const expected = val.err();

      expect(expected.isNone()).toBe(true);
    });

    it('should return Option.Some with contained value for Result.Err', () => {
      const val = result.from(NaN);

      expect(val.mapErr((err) => err.message).unwrapErrOr('nothing')).toBe('empty result');

      const expected = val.err();

      expect(expected.isSome()).toBe(true);
      expect(expected.map((err) => err.message).unwrapOr('nothing')).toBe('empty result');
    });
  });

  describe('inspect', () => {
    it('should call callback function for Result.Ok', () => {
      const cb = jest.fn();

      const val = result.from(0)
        .inspect(cb)
        .map((i) => i + 1)
        .unwrapOr(-1);

      expect(cb).toHaveBeenCalledWith(0);
      expect(val).toBe(1);
    });

    it('should not call callback function for Result.Err', () => {
      const cb = jest.fn();

      const val = result.from(NaN)
        .inspect(cb)
        .map((i) => i / 1)
        .unwrapOr(-1);

      expect(cb).not.toBeCalled();
      expect(val).toBe(-1);
    });
  });

  describe('inspectErr', () => {
    it('should not call callback function for Result.Ok', () => {
      const cb = jest.fn();

      const val = result.from(0)
        .inspectErr(cb)
        .map((i) => i + 1)
        .unwrapOr(-1);

      expect(cb).not.toBeCalled();
      expect(val).toBe(1);
    });

    it('should call callback function for Result.Err', () => {
      const cb = jest.fn();

      const val = result.from(NaN)
        .inspectErr(cb)
        .map((i) => i / 1)
        .unwrapOr(-1);

      expect(cb).toBeCalled();
      expect(val).toBe(-1);
    });
  });
});
