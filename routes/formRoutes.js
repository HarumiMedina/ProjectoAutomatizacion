const express = require('express');
const multer = require('multer');
const { getUsersSpreadsheetData, updateUsersSpreadsheetData } = require('./spreadsheetUtils');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/Registrarse', (req, res) => {
     res.render('form');
});

router.post('/formulario', upload.none(), async (req, res) => {
     try {
          const { nombres, apellidos, dni, carrera, cursos } = req.body;
          const dataToSave = [nombres, apellidos, dni, carrera, cursos];
          console.log('Datos recibidos del formulario:', dataToSave);

          const existingData = await getUsersSpreadsheetData('Datos');
          existingData.push(dataToSave);
          await updateUsersSpreadsheetData(existingData, 'Datos');
          res.redirect('/Registrarse');
     } catch (error) {
          console.error('Error al procesar la solicitud:', error);
          res.status(500).send('Error interno del servidor');
     }
});

module.exports = router;
