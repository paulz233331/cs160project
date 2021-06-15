//jest.useFakeTimers();

var app = require('./../app');
//app.main();

describe("Testing with Jest", () => {
//setTimeout(app.main(), 10000);
    //await app.main();
/*
    beforeAll(() => {
        app.main();
    });
*/
  test("Resume field", async() => {
    await app.main();
    const sum = 2 + 3;
    const expectedResult = 5;
    expect(sum).toEqual(expectedResult);
  });

/*  test.each([[1, 1, 2], [-1, 1, 0], [3, 2, 6]])(
  'Does %i + %i equals %i', (a, b, expectedResult) => {
    expect(a + b).toBe(expectedResult);
  }); */
});

