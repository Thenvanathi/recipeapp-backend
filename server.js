// Import the Express.js library
const express = require('express');

//Create an instance of an Express application
const app = express();

//Define a port for our server to listen on 
const port = 5000; 

//Define a basic route for the homepage
app.get('/', (req,res) => {
    res.send('Hello from the backend!');
}) 

//Start the server and listen on the specified port 
app.listen(port,() => {
    console.log('Server is running on http://localhost:${port}');
});