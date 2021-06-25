'use strict';
const app = require('./../app');

beforeAll( () => {
    try {
        app.use();
        //var ap = await app.main();
        //console.log(ap);
    } catch (e) {
    }
});

describe("Testing with Jest", () => {

  test("User Registration", () => {

    var expectedName;
    //expect(applicant.skype).toEqual(expectedSkype);
  });

});
