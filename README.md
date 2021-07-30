LUCENT ATS instructions to run

#Frontend
To run the frontend of the application make sure you have Node installed and follow these steps:
1. Clone the repository
2. From the root folder navigate to the client folder - "cd client"
3. Install dependencies by using - "npm install"
4. Run the app by entering - "npm start"
5. Set up backend to fully use the application



#Backend
To run the backend of the application make sure you have either Docker or AWS set up.
1. Use the instructions in setupMongo.txt to set up either Docker or AWS
*NOTE* If you use Docker you must change the var url in "input.js" to the docker url. The current url is the AWS url
2. Open PuTTY and enter - "mongod --dbpath /db/data --bind_ip_all --port 27017"
3. Open another terminal and navigate to the root folder
4. Run the backend by entering - "node input.js"