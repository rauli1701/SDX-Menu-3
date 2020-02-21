//Constants
const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const cron = require('node-cron');
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);
const app = express();
const sodURL = "https://www.sodexo.fi/ruokalistat/output/daily_json/";
// sodexo.json contains a list of restaurants that the backend will cache for it's memory
// You can easily find more restaurants from the Sodexo website and add required details to the file.
let rawdata = fs.readFileSync('sodexo.json');
let restaurants = JSON.parse(rawdata);

async function getDaily(restaurant) {
  try {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      let newUrl = sodURL + restaurant + "/" + today;
      let response = await fetch(newUrl);
      let data = await response.json();
      console.log(data);
      return data;

  } catch (err) {
      console.error(err);
  }
};

//Task to query Sodexo-API daily at 1 AM to cache it
cron.schedule('0 1 * * *', () => {
    console.log('running a task every minute');
});

app.listen(5000, () => {
    //console.log('App listening on ${PORT}');
    getDaily(1);
});

