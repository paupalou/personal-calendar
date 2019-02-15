import { generateArrayOf } from './utils';

test('should create empty array', () => {
  const array = generateArrayOf();
  const expected = [];
  expect(array).toEqual(expected);
});

test('should create array with 3 undefined slots', () => {
  const array = generateArrayOf(3);
  const expected = [undefined, undefined, undefined];
  expect(array).toEqual(expected);
});

test('should create array with 3 defined object slots', () => {
  const array = generateArrayOf(3, { 'test': true });
  const expected = [{ 'test': true }, { 'test': true }, { 'test': true }];
  expect(array).toEqual(expected);
});

