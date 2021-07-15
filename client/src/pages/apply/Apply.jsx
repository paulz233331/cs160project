import React from 'react';
import './apply.css';

    
function Apply() {
    return (
        <html>
        <head>
            <script type="text/javascript">
        </script>
        </head>
        <body topmargin="40" leftmargin="40">
             <form action="http://localhost:3001/test" method="POST" >
                 <label for="resume">Enter a resume:</label>
                 <textarea id="resume" class="resume-area" name="resume" rows="4" cols="50"></textarea>
                    <br />
                 <button type="submit" >Submit</button>
             </form> <br />
             <form action="http://localhost:3001/test2" method="post" enctype="multipart/form-data">
                <input type="file" id="resume2" name="resume2" /><br />
                <input type="submit" value="Upload" />
             </form>
             <br /> <br />
             <a href="http://localhost:3000">Return to home page.</a>
         </body>
        </html>
    )
}

export default Apply
