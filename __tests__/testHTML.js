//jest.useFakeTimers();
'use strict';
const fs = require('fs');

describe("Testing with Jest", () => {

  test("Test resume fields of JSON file", () => {

    let rawdata = fs.readFileSync('compiled/resumeHTML.json');
    let applicant = JSON.parse(rawdata);
    var expectedName = "Alex Dubinchyk";
    var expectedEmail = "alexs.dbk@gmail.com";
    var expectedObjective = "Seeking a challenging position to use my software Web development and process" +
     " optimization skills.";
    var expectedSummary = "I worked on a wide range of products including building advanced dynamic multi" +
    " language web sites, internal and external API's, well as creating new internal workflows. My goal is to work "+
    "in a passionate team, that loves their work and the products they are creating together, supporting, mentoring,"+
     " optimizing workflows and creating high quality software. I'm energenic, solution oriented team-player, "+
     "constantly learning and growing as a team, and bringing high spirits along with me.";
    var expectedTechnology = "Server side PHP programming, REST, OPP, MVC, Yii framework.\nSQL Database programming:"+
     " MySQL, SQL, MSSQL.\nClient-side programming: JavaScript, AJAX, jQuery.\nSmarty Template Engine, HTML5, CSS3.\n"+
     "Webserver installation and configuration: Apache, Nginx, IIS.\nSource control: SVN/Subversion, GIT.\nPlatforms: Linux, Mac, Windows.";
    var expectedSkills = "Server side PHP programming, REST, OPP, MVC, Yii framework.\nSQL Database programming:"+
    " MySQL, SQL, MSSQL.\nClient-side programming: JavaScript, AJAX, jQuery.\nSmarty Template Engine, HTML5, CSS3.\n"+
    "Webserver installation and configuration: Apache, Nginx, IIS.\nSource control: SVN/Subversion, GIT.\nPlatforms: Linux, Mac, Windows.";
    var expectedExperience = "Actuate http://www.actuate.com/\nFull stack PHP Developer\nSan Manteo, CA."+
    " November 2014 - current\nImplemented web service(API, MVC, Php)\nIntroduced Git to the team\nBloomSky"+
    " http://www.bloomsky.com\nBackend Developer\nSunnyvale, CA. October 2014 - November 2014\nIntegrated APIs"+
    " (PHP, Python, Django, Nginx)\nSet up PHPUnit and functional testing\nDeploy merge DB script (MSSQL>MySQL)\n"+
    "Rozumsoft LLC, / Telecontact LLC http://www.telecontact.ru/\nFull stack PHP Developer\nBelarus, Minsk."+
    " February 2012 - September 2014\nProgramming modules of dynamically building statistics for quality control"+
    " assessment project.\nDesigned and developed project quality control assessment that estimated effective work"+
    " of operators in callcenters from different regions. Includes modules separation mapping based on more 20 users"+
    " roles(RBAC), online editors(logs, statistical formulas, projects rules and etc) for more 10k clients.\n"+
    "Finalization coding script of internal protection algorithm authorization and validation.\nProgramming API"+
    " service for quality control assessment. Interact with user interface(AJAX) with fast load up JSON data,"+
    " audio files and extract large data in excel.\nAPI data exchange integrated with data parse, merge, view in"+
    " table linkage, send emails. Support more 100 source, near 1000 onlineusers, more 10 servers.\n"+
    "Codes cross-browsers users interfaces in project quality control assessment, using Javascript, jQuery, JSON, Bootstrap.\n"+
    "Developed JavaScript audio player with individual custom design, hardware acceleration, deceleration and the order to play audio files.\n"+
    "Designed and developed the company website (http://www.rozumsoft.com/).\nImplemented 3 domain zones(ru/by/com) algorithm.\n"+
    "Codes contents editor for 3 languages\nFixed and support custom seo map logic.\nDeveloped scripts products to callcenters operators\n"+
    "Development of сomplex reports and statistical summaries by Cisco data telephony.\nRedesigned and reimplemented"+
    " projects using MVC approach and strong OOP design\nDesigned and conversion of scripts database, extensive SQL"+
    " query optimization.\nReal Estate Agency Assistant heals LLC, Full stack PHP Developer\nBelarus, Minsk,"+
    " http://www.a-h.by; May 2011 - January 2012\nDynamic website design and programming using PHP, MySQL, HTML, CSS."+
    " Setup and administration of web servers and server software.\nBusiness consulting of securing/ planning project.\n"+
    "Development to online marketing, search engine placement and promotion (http://www.mogu.by; http://www.a-h.by).";

    var expectedEducation = "Belarusian University of Informatics and Radioelectronics,\nBS in Modeling and"+
    " computer-aided design of radioelectronics devices.\nProfiles\nhttps://github.com/aldb\n"+
    "https://www.linkedin.com/pub/alex-dubinchyk/a0/54b/760/en\nskype: cool-skype-id";
    var expectedSkype = "cool-skype-id";
    expect(applicant.name).toEqual(expectedName);
    expect(applicant.email).toEqual(expectedEmail);
    expect(applicant.objective).toEqual(expectedObjective);
    expect(applicant.summary).toEqual(expectedSummary);
    expect(applicant.technology).toEqual(expectedTechnology);
    expect(applicant.skills).toEqual(expectedSkills);
    expect(applicant.experience).toEqual(expectedExperience);
    expect(applicant.education).toEqual(expectedEducation);
    expect(applicant.skype).toEqual(expectedSkype);
  });

/*  test.each([[1, 1, 2], [-1, 1, 0], [3, 2, 6]])(
  'Does %i + %i equals %i', (a, b, expectedResult) => {
    expect(a + b).toBe(expectedResult);
  }); */
});

