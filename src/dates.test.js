import { getWeekOfDay } from './dates';

const JANUARY_FIRST = new Date(2019, 0, 1);

test('should return January', () => {
  const options = { month: 'long' };
  const month = JANUARY_FIRST.toLocaleDateString('en-US', options);
  expect(month).toBe('January');
});

test('should give correct day', () => {
  const expected = new Date(JANUARY_FIRST);
  expected.setDate(JANUARY_FIRST.getDate() - 1);
  expect(expected.getDate()).toBe(31);
});

test('getWeekOfDay should return correct week on January First', () => {
  expect(getWeekOfDay(JANUARY_FIRST)).toEqual([
    new Date(2018, 11, 31),
    new Date(2019, 0, 1),
    new Date(2019, 0, 2),
    new Date(2019, 0, 3),
    new Date(2019, 0, 4),
    new Date(2019, 0, 5),
    new Date(2019, 0, 6)
  ]);
});
