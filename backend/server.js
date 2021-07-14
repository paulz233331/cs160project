const express = require('express');
const app = express(); // create an express app
const bodyParser = require('body-parser'); // explained below
const MongoClient = require('mongodb').MongoClient; //explained below

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.use(bodyParser.urlencoded({extended: true})); // make sure to place body parser before CRUD handlers

// we can now connect to db by getting link from mongo atlas and pasting it in here
MongoClient.connect('mongodb+srv://Nav:nav@cluster0.z19ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => { // we put all the express request handlers in the then block so we can use the db variable
  console.log('Connected to Database')
  const db = client.db('users'); //since we need this variable we need to keep get,post etc handlers in this block
  const userCollection = db.collection('user'); // create/specify the collection

  app.post('/quotes', (req, res) => {
    userCollection.insertOne(req.body) // at this point weve posted the data to our database
     .then(result => {
       res.redirect('/') // once submitted the browser is waiting for a direction back, so now we redirect it to home page (or any page we want)
     })
     .then(result => {console.log(result)})
     .catch(error => console.error(error))
  })

  //now that we posted stuff lets try getting stuff from the db
  app.get('/', (req, res) => {
    //const cursor = db.collection('users').find() // we get info by using the find method
    //console.log(cursor); // the find method returns a cursor which is hard to comprehend so we use toArray to turn it into an array
    const cursor = db.collection('user')
     .then(results => {
       console.log(results)
     })
     .catch(error => console.error(error))
  })
})
.catch(error => console.error(error));


// app.get(endpoint, callback) - in express this is how we handle a get request
// endpoint is the url after the domain name (ex. "/api/users") and callback function tells server what to do when requested endpoint matches endpoint stated

// app.get("/", (req, res) => { // this is an example get request
//     res.send('hello world')
// })

// now lets serve up an html file to the browser. We can use the sendFile method provided by the response object
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html'); // __dirname is just the current directory we are in. So we tell express to send the html file named index in the current directory
})

// browsers can perform a Create operation (CRUD) thorugh POST requests to the server
// POST requests can be done thorough javascript or a form element
// example 1 - After we created the form with the action='/quotes' in index.html we can create what to do with that data once the form is submitted
// app.post('/quotes', (req, res) => {
//    console.log("user has submitted the form!");
//    //now to actually get the data that the user has submitted we have to npm install body-parser --save. express doesnt handle reading data on its own
//     // body-parser is a middleware to help clean the req object before using them
//     // we can use middlewares in express by the use method
//     // after requiring body parser and setting up use method for it we can console log req.body to see the object we got back
//     // now we can put the data we got into our mongodb, first do npm install mongodb --save
//     // set up use method and mongoClient connect method to link to db
// })
