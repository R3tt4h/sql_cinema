const mysql = require('mysql');

var dbConn = require('../config/db.config');

const createRestApi = app => {
    app.post('/user/login', async (request, response) => {
        if (request.session.userId) {
            response.json({result: 'ERROR', message: 'User already logged in.'});
        } else {
            const user = {
                username: request.body.username,
                password: request.body.password
            };

            try {
                const result = await dbConn.query(`SELECT id FROM sessions`);
                console.log("RESULT !!!!!!!!!!!!!!!", result)

                if (result.length > 0) {
                    const user = result[0];
                    request.session.userId = user.id;
                    response.json({result: 'SUCCESS', userId: user.id});
                } else {
                    response.json({result: 'ERROR', message: 'Indicated username or/and password are not correct.'});
                }
            } catch(e) {
                console.error(e);
                response.json({result: 'ERROR', message: 'Request operation error.'});
            } finally {
                await dbConn.end();
            }
        }
    });
      
    app.get('/user/logout', async (request, response) => {
        if (request.session.userId) {
            delete request.session.userId;
            response.json({result: 'SUCCESS'});
        } else {
            response.json({result: 'ERROR', message: 'User is not logged in.'});
        }
    });
};

module.exports = {
    createRestApi
};
