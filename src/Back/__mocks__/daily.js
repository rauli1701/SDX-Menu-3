const sodexo_mock = {
    1: { name: "laktoosi" },
    2: { name: "ville"},
    3: { name: "iskee"},
    4: { name: "jälleen"},
    5: { name: "huehuehue"},
};

function daily(url) {
    return new Promise((resolve, reject) => {
        const restaurantID = parseInt(url, 10);
        process.nextTick(() =>
            sodexo_mock[restaurantID]
                ? resolve(sodexo_mock[restaurantID])
                : reject({
                    error: 'Restaurant with ' + restaurantID + ' not found.',
                }),
        );
    });
}

module.exports = function (url) {
    return daily(url);
};