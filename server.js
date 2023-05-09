const express = require('express'); // used for easier server code. 
const date = require("date-and-time") // package for easily detting current date/time
const ordinal = require('date-and-time/plugin/ordinal'); // used for "4th" formatting in 4th of July
const app = express(); // evoke express commands easily
const PORT = 3000; // tells which port the server will listen to. 
date.plugin(ordinal) // used for "4th" formatting in 4th of July
app.use(express.static(__dirname + "/public"));

const today = date.format(new Date(), "MMMM DDD"); // gets current date and time in "July 4th" formatting. e.g. "May 8th"
const fourthJuly = date.format(new Date(1776, 6, 4), "MMMM DDD") //sets independence day in "July 4th" formatting
//const testDate = date.format(new Date(2020, 4, 8), "MMMM DDD") // test "today" against a fake "fourth July"

app.get("/", (req, res) => { // returns NO or celebration page on default path.
    console.log(today === fourthJuly)
    today === fourthJuly ? res.sendFile(__dirname + "/independenceDay.html") : res.sendFile(__dirname + "/index.html")
})

app.listen(PORT, (req, res) => { //logs that the server is listening correctly. 
    console.log(`Server listening on port ${PORT}`)
})