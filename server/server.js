import express from "express";
import cors from "cors";
import applicantDetails from "./api/applicantDetails.route.js";

const app = express(); // creating the server

app.use(cors()); // experss is going to use these modules
app.use(express.json()); // server can accept json in the body of a request

app.use("/api/v1/applicantDetails", applicantDetails); // all routes are going to be in the applicantDetails route
app.use("*", (req, res) => res.status(404).json({error: "not found"})); // if user tries to go to a route that does not exist

export default app; // we can import this module in the file that accesses the db. (The file we run to get server running). Because we want to sepearte server and db

