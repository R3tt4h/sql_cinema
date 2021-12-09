'use strict';

var dbConn = require('./../../config/db.config');

var Room = function(room) {
    this.name = room.name;
    this.capacity = room.capacity;    
}

Room.findById = function (id, result) {
    dbConn.query("Select * from rooms where id = ?", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Room.findAll = function (result) {
    dbConn.query("Select * from rooms", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('rooms: ', res);
            result(null, res);
        }
    });
};

module.exports = Room;