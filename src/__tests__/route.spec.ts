import { validate } from '../route';

test('validate', () => {
    expect(validate({ id: 'Carl' })).toBe(false);
});