// in this file we connect to the db and start the server
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ApplicantDetailsDAO from "./dao/applicantDetailsDAO.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

// connects to DB
MongoClient.connect(
    process.env.APPLICANTDETAILS_DB_URI, // pool size - number of users wtimeout - after 25ms request times out useNewUrlParse - use rewritten mongodb connection tool
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParse: true
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
//now we can listen/start our webserver after connecting to the db
.then(async client => {
    await ApplicantDetailsDAO.injectDB(client)  //right before we start our server we are going to get our inital reference to the applicant details collection
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})
 
