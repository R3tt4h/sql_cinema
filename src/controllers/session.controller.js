'use strict';

const Session = require('../models/session.model');
const Room = require('../models/room.model');
const Movie = require('../models/movie.model');

exports.findAll = function(req, res) {
    Session.findAll(function(err, session) {
        if (err)
            res.send(err);
            Movie.findAll(function(err, movie){
                if(err)
                    res.send(err);
                    Room.findAll(function(err, room){
                        if(err)
                        res.send(err);
                        res.render('sessions', {session, movie, room});
            })
        })
    });
};


exports.create = function(req, res) {
    const date = req.body.session_date
    const time = req.body.hour
    const formatedTime = time.concat("", ":00")
    const formatedDate = date.concat(" ", formatedTime)

    const payload = {
        "movie_id": req.body.movie_id,
        "room_id": req.body.room_id,
        "session_date": formatedDate,
        "nb_available_place": 0
    }

    const new_session = new Session(payload);
    Session.create(new_session);
    res.redirect("/api/v1/sessions")
};

exports.findById = function(req, res) {
    Session.findById(req.params.id)
};

exports.delete = function(req, res) {
    Session.delete( req.params.id)
    res.redirect("/api/v1/sessions")
};