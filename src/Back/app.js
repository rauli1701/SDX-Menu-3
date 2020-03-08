//Constants
const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const dee = require('./daily');
const PORT = process.env.PORT || 5000;
const app = express();
// sodexo.json contains a list of restaurants that the backend will cache for it's memory
// You can easily find more restaurants from the Sodexo website and add required details to the file.
let rawdata = fs.readFileSync('sodexo.json');
//let rawdata = fs.readFileSync(path.join(__dirname, 'sodexo.json'));
let restaurants = JSON.parse(rawdata);


function daily(url) {
    return dee(url);
};


//Task to query Sodexo-API daily at 1 AM to cache it
cron.schedule('0 1 * * *', () => {
    console.log('running a task every minute');
});

app.listen(5000, () => {
    //console.log('App listening on ${PORT}');
    let test = daily(96);
    console.log(daily);

});
module.exports = {
    daily: function(restaurantID) { return daily(restaurantID);},

};

