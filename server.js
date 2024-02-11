
const express = require('express');
const session = require('express-session');
const path = require('path');
const formRoutes = require('./routes/formRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const Swal = require('sweetalert2')
const morgan = require('morgan');
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(session({
     secret: 'de123asdsadfiji132j4i1',
     resave: false,
     saveUninitialized: true
}));

const isAuthenticated = (req, res, next) => {
     if (req.session.isLoggedIn) {
          return next();
     } else {
          res.redirect('/login');
     }
};

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
/*
app.use((req, res, next) => {
     const allowedPaths = ['/login', '/register'];
     if (!allowedPaths.includes(req.path) && !req.session.isLoggedIn) {
          return res.redirect('/login');
     }
     next();
});*/
app.use('/', formRoutes);
app.use('/', userRoutes);
app.use('/', dashboardRoutes);

app.listen(PORT, () => {
     console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
