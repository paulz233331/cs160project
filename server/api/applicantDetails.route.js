// this is our route file, here we will create routes that users can go to
import express from "express";
import ApplicantDetailsCtrl from "./applicantDetails.controller.js";

const router = express.Router(); // by importing express we get access to express router

// router.route("/").get((req, res) => res.send("hello world")); // this is just a demonstartion route
router.route("/").get(ApplicantDetailsCtrl.apiGetApplicantDetails);

export default router;