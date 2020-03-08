const app = require('../daily');

test('Build dailyr url', () => {
    function dailyUrl() {
        app.buildDailyUrl(12);
    }
    expect.stringContaining("12");



});

test('Build dailyUrl nah', () => {
    function dailyUrl() {
        app.buildDailyUrl();
    }
    expect.not.stringContaining("monkey");

});
