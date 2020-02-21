const app = require('./app');

test('Get daily menu', () => {
    function getNon() {
        app.getDaily(1);
    }
    expect(getNon).toThrowError('invalid-json');
});