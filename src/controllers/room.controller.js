'use strict';

const Room = require('../models/room.model');

exports.findAll = function(req, res) {
    Room.findAll(function(err, room) {
        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', room);
        res.render('rooms',{room});

    });
};

exports.findById = function(req, res) {
    Room.findById(req.params.id, function(err, room) {
        if (err)
            res.send(err);
            res.json(room);
    });
};
