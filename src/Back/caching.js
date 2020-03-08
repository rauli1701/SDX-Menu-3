const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

const expiration = {
    1: {duration: 1, name: "_test"},
    2: {duration: 82800, name: "_daily"},
    3: {duration: 82800, name: "_weekly"},
}


client.on("error", function(error) {
    console.error(error);
});

function setCache(id, time, data) {
    client.setex(id+expiration[time].name, expiration[time].duration, data, redis.print);
}

function getCache(id, time) {
    return client.get(id+expiration[time].name)
}

module.exports = {
    setCache: function(id, time, data) { return setCache(id, time,data);},
    getCache: function(id, time) { return getCache(id, time);},
}