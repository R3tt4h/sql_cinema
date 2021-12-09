'use strict';

var dbConn = require('./../../config/db.config');

var Session = function(session) {
    this.movie_id = session.movie_id;
    this.room_id = session.room_id;    
    this.session_date = session.session_date;
    this.nb_available_place = session.nb_available_place;

}

Session.findById = function (id, result) {
    dbConn.query("Select * from sessions where id = ?", id)
};

Session.findAll = function (result) {
    dbConn.query("Select * from db_sessions_dates", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('sessions: ', res);
            result(null, res);
        }
    });
};


Session.delete = function(id) {
    dbConn.query("DELETE FROM sessions WHERE id=?", [id])
};

Session.create = async function(newSes) {
    await dbConn.query(`CALL room_capacity(?)`, newSes.room_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
        } else {
            newSes.nb_available_place = res[0][0].capacity
            console.log('capacity: ', res[0][0].capacity);
            console.log(newSes)
            dbConn.query("INSERT INTO sessions set ?", newSes)
        }
    });    
};

module.exports = Session;
