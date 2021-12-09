'use strict';

const Movie = require('../models/movie.model');

exports.findAll = function(req, res) {
    Movie.findAll(function(err, movie) {
        if (err)
            res.send(err);
            res.render('movies',{movie});
    });
};

exports.findById = function(req, res) {
    Movie.findById(req.params.id)
};

exports.create = function(req, res) {
    const date = req.body.release_date
    const formatedDate = date.concat(" ")

    const payload = {
        "movie_id": req.body.id,
        "name": req.body.name,
        "genre": req.body.genre,
        "duration": req.body.duration,
        "release_date": formatedDate,
        "image": req.body.image
    }

    
    const new_movie = new Movie(payload);
    Movie.create(new_movie);
    res.redirect("/api/v1/movies")    
};

exports.update = function(req, res) {
    Movie.update(req.params.id, new Movie(req.body))
    res.redirect("/api/v1/movies")
}


exports.delete = function(req, res) {
    Movie.delete( req.params.id);
    res.redirect("/api/v1/movies")    

};