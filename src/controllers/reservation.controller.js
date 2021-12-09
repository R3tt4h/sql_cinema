'use strict';

const Reservation = require('../models/reservation.model');
const Session = require('../models/session.model');

exports.findAll = function(req, res) {
    Reservation.findAll(function(err, reservation) {
        if (err)
            res.send(err);
            Session.findAll(function(err, session){
                if(err)
                    res.send(err);
                    res.render('reservations', {reservation, session});

        })
    });
};

exports.create = function(req, res) {
    const new_reservation = new Reservation(req.body);
    Reservation.create(new_reservation);
    res.redirect("/api/v1/reservations")

};


exports.delete = function(req, res) {
    Reservation.delete( req.params.id);
    res.redirect("/api/v1/reservations")    

};