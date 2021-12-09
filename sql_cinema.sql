CREATE DATABASE `sql_cinema`; 
USE `sql_cinema`;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH privileges;

/*----- ADMIN ----- */
CREATE TABLE IF NOT EXISTS `users` (
    `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users`
    (`id`, `username`, `password`)
VALUES
    (1, 'admin', 'admin');

/* ------ MOVIES ----- */
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `duration` int(50) NOT NULL,
  `release_date` date NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/* ------ SESSIONS ----- */
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `nb_available_place` int(11) NOT NULL,
  `session_date` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `nb_available_place_constraint` CHECK(nb_available_place >= 0 ),
  CONSTRAINT `fk_session_movie_id`
  FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_session_room_id`
  FOREIGN KEY (`room_id`) REFERENCES `rooms` (`romm_id`) ON UPDATE CASCADE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/* ------ RESERVATIONS ----- */
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  `session_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_reservation_session_id`
  FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`) ON UPDATE CASCADE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/* ------ ROOMS ----- */
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/* ------ VIEWS ----- */
CREATE VIEW db_sessions_dates AS
SELECT sessions.id, sessions.movie_id, sessions.room_id,date_format(sessions.session_date, '%y-%m-%d') AS session_day, date_format(sessions.session_date, '%HH%i') AS session_hour, sessions.nb_available_place
FROM sessions;


CREATE VIEW db_movie_release_date AS
SELECT movies.id, movies.name, movies.genre, movies.duration,date_format(movies.release_date, '%y-%m-%d') AS release_date_day, movies.image
FROM movies;

/* ------ PROCEDURE ----- */
DELIMITER |
CREATE PROCEDURE movie_according_to_room_id(IN p_movie_id INT)
BEGIN
	SELECT *
    FROM sessions
    WHERE movie_id = p_movie_id;
END|

CREATE PROCEDURE room_capacity(IN p_room_id INT)
BEGIN
	SELECT capacity
    FROM rooms
    WHERE id = p_room_id;
END|
DELIMITER ;

/* ----- TRANSACTION ----- */
DELIMITER |
CREATE PROCEDURE validation_reservation(IN p_session_id INT, IN p_last_name VARCHAR(255), IN p_first_name VARCHAR(255), IN p_email VARCHAR(255), IN p_telephone VARCHAR(255), IN p_date_of_birth DATE)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    SET autocommit = 0;
	START TRANSACTION;
		UPDATE sessions SET nb_available_place = (nb_available_place - 1)
        WHERE id = p_session_id;
		INSERT INTO reservations VALUE (null, p_last_name, p_first_name, p_email, p_telephone, p_date_of_birth, p_session_id);
        if (nb_available_place > 0) then
			COMMIT;
		ELSE
			ROLLBACK;
		END IF;
        
    SET autocommit = 1;
END|
DELIMITER ;

DROP PROCEDURE validation_reservation;


/* ----- Test ----- */ 
DROP PROCEDURE validation_reservation;
CALL validation_reservation(1, 'X', 'Y', 'email@email.com', '0682739217', '1997-05-28');
CALL room_capacity(1);
CALL movie_according_to_room_id(2);

/* ----- INSERT ----- */ 
INSERT INTO movies
VALUE 
(null, 'Star Wars: La guerre des étoiles', 'Action, Aventure, Fantasy', 121, '1997-10-19', 'https://www.imdb.com/title/tt0076759/mediaviewer/rm3263717120/?ref_=tt_ov_i');

INSERT INTO rooms
VALUES
(null, 'Salle 1', '35'),
(null, 'Salle 2', '20'),
(null, 'Salle 3', '20');

INSERT INTO sessions
value(null, '1', '1', '35', '16:45:00');

INSERT INTO reservations
VALUES
(null, 'Almeida', 'Kevin', 'email@email.com', '0667912716', '1997-03-07', '1'),
(null, 'Cotovio', 'Sébastien', 'test@test.com', '0612345678', '1997-09-29', '1');

SELECT id, username, password FROM `users` WHERE username='admin' and password = 'admin';