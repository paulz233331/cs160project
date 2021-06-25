'use strict';
const app = require('./../app');
require('dotenv').config();

describe("Testing with Jest", () => {

  test("User Registration", () => {

    var expectedName;
    expect(process.env.ISSUER_BASE_URL).toEqual("https://cs160.us.auth0.com");
    expect(process.env.BASE_URL).toEqual("http://localhost:3000");
    expect(process.env.CLIENT_ID).toEqual("G5jX8KdS6gbXTnmS99dNLZjjhrEyp6tF");
    expect(process.env.SECRET).toEqual("dslkajflrasjfdklajsdjfl;asjdlfkjasldjkfjifugoifgiudfgdnfgldfjgldfj");
  });

});
