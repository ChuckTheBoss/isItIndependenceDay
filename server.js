const express = require('express'); // used for easier server code. 
const date = require("date-and-time") // package for easily detting current date/time
const ordinal = require('date-and-time/plugin/ordinal'); // used for "4th" formatting in 4th of July
const app = express(); // evoke express commands easily
const PORT = 3000; // tells which port the server will listen to. 
date.plugin(ordinal) // used for "4th" formatting in 4th of July
app.use(express.static(__dirname + "/public"));

let dates = { //defines dates used throughout the program
    now: new Date(),
    currentYear() {
        return this.now.getFullYear()
    },
    today: date.format(new Date(), "MMMM DDD"), // gets current date and time in "July 4th" formatting. e.g. "May 8th"
    fourthJuly: date.format(new Date(1776, 6, 4), "MMMM DDD"), //sets independence day in "July 4th" formatting
    daysUntilNextFourthJuly() {
        let daysUntil = date.subtract(new Date(), new Date(this.currentYear(), 6, 4)).toDays();
        if (daysUntil <= 0) {
            return Math.floor(Math.abs(date.subtract(new Date(), new Date(this.currentYear(), 6, 4)).toDays()));
        } else if (daysUntil > 0) {
            return Math.floor(Math.abs(date.subtract(new Date(), new Date(this.currentYear() + 1, 6, 4)).toDays()))
        }
    },
    isTodayFourthOfJuly() {
        return this.today === this.fourthJuly
    }
}

app.get("/", (req, res) => { // returns NO or celebration page on default path.
    console.log(dates.isTodayFourthOfJuly())
    dates.isTodayFourthOfJuly() ? res.sendFile(__dirname + "/independenceDay.html") : res.sendFile(__dirname + "/index.html")
})

app.get("/api", (req, res) => { // returns api documentation
    res.sendFile(__dirname + "/api.html")
    res.json(
        {
            "Today's date": dates.today,
            "Fourth of July date": dates.fourthJuly,
            "Is it the Fourth of July?": dates.isTodayFourthOfJuly(),
            "How many days until the Fourth of July?": dates.daysUntilNextFourthJuly()
        }
    )
})

app.listen(PORT, (req, res) => { //logs that the server is listening correctly. 
    console.log(`Server listening on port ${PORT}`)
})