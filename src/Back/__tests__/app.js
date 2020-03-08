const app = require('../app');

jest.mock('../daily');

it('works with promises', () => {
    expect.assertions(1);
    return app.daily(1).then(data => expect(data.name).toEqual('laktoosi'));
});