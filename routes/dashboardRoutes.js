const express = require('express');
const router = express.Router();
const { getUsersSpreadsheetData } = require('./spreadsheetUtils');

router.get('/dashboard', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('Datos');
          res.render('dashboard/panel', { data });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "Datos":', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/matriculas', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('Datos');
          res.render('dashboard/matriculas', { data });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "Datos":', error);
          res.status(500).send('Error interno del servidor');
     }
});
router.get('/solicitudes', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('Respuestas de formulario 2');
          res.render('dashboard/solicitudes', { data });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "Datos":', error);
          res.status(500).send('Error interno del servidor');
     }
});
module.exports = router;
