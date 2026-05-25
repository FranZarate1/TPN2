const suma = require('./suma');

test('1 + 2 debería ser 3', () => {
  expect(suma(1, 2)).toBe(3);
});

