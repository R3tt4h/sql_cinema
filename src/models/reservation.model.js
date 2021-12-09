'use strict';

var dbConn = require('./../../config/db.config');

var Reservation = function(reservation) {
    this.last_name = reservation.last_name;
    this.first_name = reservation.first_name;    
    this.email = reservation.email;
    this.telephone = reservation.telephone;
    this.date_of_birth = reservation.date_of_birth;
    this.session_id = reservation.session_id;
}

Reservation.create = async function (newRes) {
    await dbConn.query(`CALL validation_reservation(?, ?, ?, ?, ?, ?)`, [newRes.session_id, newRes.last_name, newRes.first_name, newRes.email, newRes.telephone, newRes.date_of_birth])
};


Reservation.findAll = function (result) {
    dbConn.query("Select * from reservations", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('reservations: ', res);
            result(null, res);
        }
    });
};

Reservation.delete = function(id) {
    dbConn.query("DELETE FROM reservations WHERE id=?", [id]);
};

module.exports = Reservation;