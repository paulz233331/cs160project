'use strict';
const fs = require('fs');
const app = Promise.promisifyAll(require('./../app_/app'));

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

    let applicant = JSON.parse(rawdata);
    var expectedName = 
    expect(applicant.skype).toEqual(expectedSkype);
  });
  
});
