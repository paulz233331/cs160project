import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './employer.css';

function Employer() {
    return (
        <html>
        <head>
            <script type="text/javascript">
        </script>
        </head>
        <body>

        <div>
            <Navbar employerNavBar={true} />
            <h1>Employer Dashboard</h1>
        </div>

             This is the employer's page. <br /><br/>
             Resume Management <br /><br />
             <form action="http://localhost:3001/emp1" method="post">
                 <label for="fnd">1) Text search: &nbsp;&nbsp;</label>
                 <input type="text" id="fnd" name="fnd" />&nbsp;&nbsp;
                 Section:&nbsp;&nbsp;
                 <select name="sections" id="cars">
                   <option value="entire">entire</option>
                   <option value="education">education</option>
                   <option value="summary">summary</option>
                   <option value="objective">objective</option>
                   <option value="skills">skills</option>
                   <option value="experience">experience</option>
                   <option value="projects">projects</option>
                   <option value="technology">technology</option>
                   <option value="languages">languages</option>
                 </select>&nbsp;&nbsp;
                 <input type="submit" value="Submit" /><br/><br/>
             </form>


             <form action="http://localhost:3001/emp3" method="post">
                 2) Find applicants by status: &nbsp;&nbsp;
                 <select name="status" id="status">
                    <option value="interviewed">interviewed</option>
                    <option value="hired">hired</option>
                    <option value="offered">offered</option>
                    <option value="otherOffer">otherOffer</option>
                  </select> &nbsp;&nbsp;<input type="submit" value="Submit" />
              </form>
              <br/>
              <form action="http://localhost:3001/emp4" method="post">
                  <label for="psn">3) Find applicants by position: &nbsp;&nbsp; </label>
                   <input type="text" id="psn" name="psn" />
                   &nbsp;&nbsp;
                   <input type="submit" value="Submit" />
               </form>
               <br />

               Hiring Process: <br /><br />

             <form action="http://localhost:3001/emp2" method="post">
                 4) Create a list of names and emails: &nbsp;&nbsp;
                 <input type="submit" value="Generate" /><br/><br/>
             </form>

               <form action="http://localhost:3001/emp5" method="post">
                 <label for="stu">5) Update an applicant's status: &nbsp;&nbsp; </label>
                 Name: &nbsp;&nbsp; <input type="text" id="stu" name="stu" />&nbsp;&nbsp;
                 Status: &nbsp;&nbsp; <select name="sts" id="sts">
                      <option value="interviewed">interviewed</option>
                      <option value="hired">hired</option>
                      <option value="offered">offered</option>
                      <option value="otherOffer">otherOffer</option>
                  </select> &nbsp;&nbsp;
                  <select name="statusValue" id="statusValue">
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select> &nbsp;&nbsp;
                  <input type="submit" value="Update" />
                  <br /><br />
                  <a href="http://localhost:3000">Return to home page.</a>
              </form>
         </body>
        </html>
    )
}

export default Employer
