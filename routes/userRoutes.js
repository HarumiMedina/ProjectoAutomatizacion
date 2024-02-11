const express = require('express');
const multer = require('multer');
const Swal = require('sweetalert2');
const { getUsersSpreadsheetData, updateUsersSpreadsheetData } = require('./spreadsheetUtils');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get('/', (req, res) => {
     res.render('index');
});
router.get('/login', (req, res) => {
     res.render('login', { failedLogin: false });

})

router.get('/register', (req, res) => {
     res.render('register');
});


router.post('/register', upload.none(), async (req, res) => {
     try {
          const { username, password } = req.body;

          const existingUsersData = await getUsersSpreadsheetData('Usuarios');
          const existingUser = existingUsersData.find(user => user[0] === username);

          if (existingUser) {
               return res.status(400).send('El usuario ya existe');
          }

          const newUser = [username, password];
          existingUsersData.push(newUser);
          await updateUsersSpreadsheetData(existingUsersData, 'Usuarios');
          console.log('Usuario registrado:', newUser);

          res.redirect('/login');
     } catch (error) {
          console.error('Error al procesar la solicitud de registro:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.post('/login', upload.none(), async (req, res) => {
     try {
          const { username, password } = req.body;

          const usersData = await getUsersSpreadsheetData('Usuarios');

          const user = usersData.find(userData => userData[0] === username && userData[1] === password);

          if (user) {
               req.session.isLoggedIn = true;
               req.session.username = username;
               res.redirect('/dashboard');
          } else {
               res.render('login', { failedLogin: true });
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de login:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/logout', (req, res) => {
     req.session.destroy((err) => {
          if (err) {
               console.error('Error al cerrar la sesión:', err);
          }
          res.redirect('/login');
     });
});

module.exports = router;
