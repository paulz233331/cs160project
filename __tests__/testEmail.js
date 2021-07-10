'use strict';

const fs = require('fs');

/*beforeAll(async () => {
    return await app.main();
});
*/

describe("Testing with Jest", () => {

  test("Email result", () => {

    let rawdata = fs.readFileSync('sentEmail.json');
    let applicant = JSON.parse(rawdata);
    var expectedFrom = "lucentats@gmail.com";
    var expectedTo = "johannkwon01@gmail.com";
    var expectedSubject = "Confirmation Email";
    var expectedText = "Dear Alex Dubinchyk, \n\nYour application for swe at Company Inc has been submitted. We appreciate your interest in our team!\n\nIf you are selected for a follow-up interview, a representative will contact you for further information.\n\nThanks, \nCompany Inc\n\nPlease do not reply to this email.";
    expect(applicant.from).toEqual(expectedFrom);
    expect(applicant.to).toEqual(expectedTo);
    expect(applicant.subject).toEqual(expectedSubject);
    expect(applicant.text).toEqual(expectedText);

  });
/*
  test.each([[1, 1, 2], [-1, 1, 0], [3, 2, 6]])(
  'Does %i + %i equals %i', (a, b, expectedResult) => {
    expect(a + b).toBe(expectedResult);
  }); */
});
