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
             <form action="http://localhost:3001/test" method="POST">
                 <label for="resume">Enter a resume:</label>
                 <textarea id="resume" class="resume-area" name="resume" rows="4" cols="50"></textarea>
                 <button type="submit" >Submit</button>
             </form>
         </body>
        </html>
    )
}

export default Apply
