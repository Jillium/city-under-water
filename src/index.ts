const express = require('express');


const app = express();
const PORT = 8080;

// ** TODO ** Replace this code with a call to your games router class to handle all calls to /games endpoint
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);

    // ** TODO ** Call to Game Service to initiate connection
});