import * as option from '../utils/option';

describe('Option', () => {
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
});
