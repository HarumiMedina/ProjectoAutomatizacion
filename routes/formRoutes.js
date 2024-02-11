const express = require('express');
const multer = require('multer');
const { getUsersSpreadsheetData, updateUsersSpreadsheetData } = require('./spreadsheetUtils');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/cursos_sistemas/agregar', (req, res) => {
     res.render('form_AS');
});
router.get('/cursos_produccion/agregar', (req, res) => {
     res.render('form_PA');
});

router.post('/formulario', upload.none(), async (req, res) => {
     try {
          const {
               curso,
               inicio,
               fin,
               horas,
               carpeta1,
               carpeta2,
               enlace1,
               enlace2,
               ponentes,
               temas
          } = req.body;

          const temasArray = temas.split(',').map(t => t.trim());

          const dataToSave = [curso, inicio, fin, horas, carpeta1, carpeta2, enlace1, enlace2, ponentes, ...temasArray];
          console.log('Datos recibidos del formulario:', dataToSave);

          const existingData = await getUsersSpreadsheetData('CURSOS_SISTEMAS');

          existingData.push(dataToSave);

          await updateUsersSpreadsheetData(existingData, 'CURSOS_SISTEMAS');

          res.redirect('/cursos_sistemas')
     } catch (error) {
          console.error('Error al procesar la solicitud:', error);
          res.status(500).send('Error interno del servidor');
     }
});
router.post('/formulario_produccion', upload.none(), async (req, res) => {
     try {
          const {
               curso,
               inicio,
               fin,
               horas,
               carpeta1,
               carpeta2,
               enlace1,
               enlace2,
               ponentes,
               temas
          } = req.body;

          const temasArray = temas.split(',').map(t => t.trim());

          const dataToSave = [curso, inicio, fin, horas, carpeta1, carpeta2, enlace1, enlace2, ponentes, ...temasArray];

          const existingData = await getUsersSpreadsheetData('CURSOS_PRODUCCION');

          existingData.push(dataToSave);

          await updateUsersSpreadsheetData(existingData, 'CURSOS_PRODUCCION');

          res.redirect('/curso_produccion')
     } catch (error) {
          console.error('Error al procesar la solicitud:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/cursos_sistemas', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('CURSOS_SISTEMAS');
          res.render('crud/sistemas', { cursosData: data.slice(1) });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "CURSOS_SISTEMAS":', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/cursos_produccion', async (req, res) => {
     try {
          const data = await getUsersSpreadsheetData('CURSOS_PRODUCCION');
          res.render('crud/produccion', { cursosData: data.slice(1) });
     } catch (error) {
          console.error('Error al obtener datos de la hoja "CURSOS_PRODUCCION":', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/cursos_produccion/editar/:id', async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const data = await getUsersSpreadsheetData('CURSOS_PRODUCCION');

          if (courseId >= 0 && courseId < data.length - 1) {
               const curso = data[courseId + 1];
               res.render('crud/produccion/editar', { curso, courseId });
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al obtener datos para editar curso:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.post('/cursos_produccion/editar/:id', upload.none(), async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const {
               curso,
               inicio,
               fin,
               horas,
               carpeta1,
               carpeta2,
               enlace1,
               enlace2,
               ponentes,
               temas
          } = req.body;

          const temasArray = temas.split(',').map(t => t.trim());

          const data = await getUsersSpreadsheetData('CURSOS_PRODUCCION');

          if (courseId >= 0 && courseId < data.length - 1) {
               data[courseId + 1] = [curso, inicio, fin, horas, carpeta1, carpeta2, enlace1, enlace2, ponentes, ...temasArray];

               await updateUsersSpreadsheetData(data, 'CURSOS_PRODUCCION');

               res.redirect('/cursos_produccion');
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de edición:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/cursos_produccion/eliminar/:id', async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const data = await getUsersSpreadsheetData('CURSOS_PRODUCCION');

          if (courseId >= 0 && courseId < data.length - 1) {
               const rowIndexToDelete = courseId + 1;
               data.splice(rowIndexToDelete, 1);

               await updateUsersSpreadsheetData(data, 'CURSOS_PRODUCCION');

               res.redirect('/cursos_produccion');
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de eliminación:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.post('/cursos_produccion/eliminar/:id', async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const data = await getUsersSpreadsheetData('CURSOS_PRODUCCION');

          if (courseId >= 0 && courseId < data.length - 1) {
               const rowIndexToDelete = courseId + 1;
               data.splice(rowIndexToDelete, 1);

               await updateUsersSpreadsheetData(data, 'CURSOS_PRODUCCION');

               res.redirect('/cursos_produccion');
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de eliminación:', error);
          res.status(500).send('Error interno del servidor');
     }
});

router.get('/cursos_sistemas/editar/:id', async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const data = await getUsersSpreadsheetData('CURSOS_SISTEMAS');

          if (courseId >= 0 && courseId < data.length - 1) {
               const curso = data[courseId + 1];
               res.render('crud/sistemas/editar', { curso, courseId });
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al obtener datos para editar curso:', error);
          res.status(500).send('Error interno del servidor');
     }
});


router.post('/cursos_sistemas/editar/:id', upload.none(), async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const {
               curso,
               inicio,
               fin,
               horas,
               carpeta1,
               carpeta2,
               enlace1,
               enlace2,
               ponentes,
               temas
          } = req.body;

          const temasArray = temas.split(',').map(t => t.trim());

          const data = await getUsersSpreadsheetData('CURSOS_SISTEMAS');

          if (courseId >= 0 && courseId < data.length - 1) {
               data[courseId + 1] = [curso, inicio, fin, horas, carpeta1, carpeta2, enlace1, enlace2, ponentes, ...temasArray];

               await updateUsersSpreadsheetData(data, 'CURSOS_SISTEMAS');

               res.redirect('/cursos_sistemas');
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de edición:', error);
          res.status(500).send('Error interno del servidor');
     }
});



router.get('/cursos_sistemas/eliminar/:id', async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const data = await getUsersSpreadsheetData('CURSOS_SISTEMAS');

          if (courseId >= 0 && courseId < data.length - 1) {
               const rowIndexToDelete = courseId + 1;
               data.splice(rowIndexToDelete, 1);

               await updateUsersSpreadsheetData(data, 'CURSOS_SISTEMAS');

               res.redirect('/cursos_sistemas');
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de eliminación:', error);
          res.status(500).send('Error interno del servidor');
     }
});


router.post('/cursos_sistemas/eliminar/:id', async (req, res) => {
     try {
          const courseId = parseInt(req.params.id);
          const data = await getUsersSpreadsheetData('CURSOS_SISTEMAS');

          if (courseId >= 0 && courseId < data.length - 1) {
               const rowIndexToDelete = courseId + 1;
               data.splice(rowIndexToDelete, 1);

               await updateUsersSpreadsheetData(data, 'CURSOS_SISTEMAS');

               res.redirect('/cursos_sistemas');
          } else {
               res.status(404).send('Curso no encontrado');
          }
     } catch (error) {
          console.error('Error al procesar la solicitud de eliminación:', error);
          res.status(500).send('Error interno del servidor');
     }
});

module.exports = router;

