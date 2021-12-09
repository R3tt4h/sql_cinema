const express = require('express');
var session = require('express-session');


const app = express();
const port = process.env.PORT || 5000;

var path = require('path');

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(__dirname+'/style'))

app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    var session = req.session;
    console.log(session)
    res.render('home', {session});
});

app.get("/update_form", function(req, res){
    res.render('update_form')
})


const movieRoutes = require('./src/routes/movie.routes')
const reservationRoutes = require('./src/routes/reservation.routes')
const roomRoutes = require('./src/routes/room.routes')
const sessionRoutes = require('./src/routes/session.routes')
const authRoutes = require('./src/routes/auth.routes')


app.use('/api/v1/movies', movieRoutes)

app.use('/api/v1/reservations', reservationRoutes)

app.use('/api/v1/rooms', roomRoutes)

app.use('/api/v1/sessions', sessionRoutes)

app.use('/login', authRoutes)



app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});