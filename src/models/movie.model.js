'use strict';

var dbConn = require('./../../config/db.config');

var Movie = function(movie) {
    this.name = movie.name;
    this.genre = movie.genre;    
    this.duration = movie.duration;
    this.release_date = movie.release_date;    
    this.image = movie.image;
}

Movie.create = function (newMov) {
    dbConn.query("INSERT INTO movies set ?", newMov)
};

Movie.findAll = function (result) {
    dbConn.query("Select * from db_movie_release_date", function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('movies: ', res);
            result(null, res);
        }
    });
};

Movie.findById = function (id) {
    dbConn.query("Select * from movies where id = ?", id)
};

Movie.update = function(id, movie){
    dbConn.query("UPDATE movies SET name=?, genre=?, duration=?, release_date=?, image=? WHERE id = ?", [movie.name, movie.genre, movie.duration, movie.release_date, movie.image, id])
}


Movie.delete = function(id) {
    dbConn.query("DELETE FROM movies WHERE id=?", [id])
};

module.exports = Movie;