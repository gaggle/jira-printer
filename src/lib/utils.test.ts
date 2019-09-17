import { deepStrictEqual } from 'assert';

import { filter } from './utils';

describe('filter', () => {
  it('removes specified args', () => {
    const result = filter({ a: 1, b: 2 }, 'b');
    deepStrictEqual(result, { a: 1 });
  });
});
