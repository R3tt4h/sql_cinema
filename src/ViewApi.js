const path = require('path');

const createViewApi = app => {
    app.get('/login', async (request, response) => {
        if (request.session.userId) {
            return response.send(path.join(__dirname, '../view/home.ejs'));
        } else {
            return response.render(path.join(__dirname, '../views/login.ejs'));
        }
    });
};

module.exports = {
    createViewApi
};