const express = require('express');
const router = express.Router();
const { getUsersSpreadsheetData } = require('./spreadsheetUtils');

router.get('/dashboard', async (req, res) => {
     try {
          const matriculaData = await getUsersSpreadsheetData('Form.Matricula');
          const certificadoData = await getUsersSpreadsheetData('FormCertificado');

          const totalMatriculados = matriculaData.length > 1 ? matriculaData.length - 1 : 0;
          const totalSolicitudes = certificadoData.length > 1 ? certificadoData.length - 1 : 0;

          res.render('dashboard/panel', { totalMatriculados, totalSolicitudes, username: req.session.username });
     } catch (error) {
          console.error('Error al obtener datos de las hojas:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/matriculas', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('Form.Matricula');
          res.render('dashboard/matriculas', { matriculasData: data.slice(1) });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "Form.Matricula":', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/solicitudes', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('FormCertificado');
          res.render('dashboard/solicitudes', { solicitudesData: data.slice(1) });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "FormCertificado":', error);
          res.status(500).send('Error interno del servidor');
     }
});

module.exports = router;
