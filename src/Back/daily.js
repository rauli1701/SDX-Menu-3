const axios = require('axios');
const sodURL = "https://www.sodexo.fi/ruokalistat/output/daily_json/";
function buildDailyUrl(restaurant) {
    try {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        let newUrl = sodURL + restaurant + "/" + today;
        //console.log(newUrl);
        return newUrl;
    } catch (err) {
        console.error(err);
    }
};



async function dailyFetch(restaurantID) {
    try {
        let url = buildDailyUrl(restaurantID);
        return await axios.get(url)
    } catch (error) {
        console.log("Error happened while fetching:");
        console.error("Status ", error.response.status);
    }
};

module.exports = function (restaurantID) {
    return dailyFetch(restaurantID);
};