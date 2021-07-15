import React from 'react';
import './employer.css';

function Employer() {
    return (
        <html>
        <head>
            <script type="text/javascript">
        </script>
        </head>
        <body topmargin="40" leftmargin="40">
             This is the employer's page. <br /><br/>

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

             <form action="http://localhost:3001/emp2" method="post">
                 2) Create a list of names and emails: &nbsp;&nbsp;
                 <input type="submit" value="Generate" /><br/><br/>
             </form>

             <form action="http://localhost:3001/emp3" method="post">
                 3) Find applicants by status: &nbsp;&nbsp;
                 <select name="status" id="status">
                    <option value="interviewed">interviewed</option>
                    <option value="hired">hired</option>
                    <option value="offered">offered</option>
                    <option value="otherOffer">otherOffer</option>
                  </select> &nbsp;&nbsp;<input type="submit" value="Submit" />
              </form>
              <br/>
              <form action="http://localhost:3001/emp4" method="post">
                  <label for="psn">4) Find applicants by position: &nbsp;&nbsp; </label>
                   <input type="text" id="psn" name="psn" />
                   &nbsp;&nbsp;
                   <input type="submit" value="Submit" />
               </form>
               <br />

         </body>
        </html>
    )
}

export default Employer
