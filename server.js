// require('dotenv').config();



// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Spin up the server

const port = 7000;

const server = app.listen(port, listening)

function listening() {
    console.log('Server running');
    console.log(`Running on localhost: ${port}`);
}

// Initialize all route with a callback function

app.get('/all', sendDataBack);

function sendDataBack(req, res) {
    res.send(projectData);
    

}

// app.get('/api', (req, res) => {
//     const apiKey = process.env.API_KEY;
//     res.send(apiKey);
// })

// Post Route

app.post('/all', (req, res) => {
    const newData = req.body;
    // res.json(newData);
    projectData.innerObj = newData;

});


