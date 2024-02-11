const formId = '1fkYJ8poPkVonGYXZ0gsmK2oGjJJtOU4e5u6gsCYJVmQ';

function main() {
     opcionesSistema();
     opcionesProduccion();
     estadoSol();
     copiarDatos();
}

function opcionesSistema() {

     var preguntaId = '1220609827';

     var form = FormApp.openById(formId);

     var pregunta = form.getItemById(preguntaId);

     var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CURSOS_SISTEMAS');
     var opciones = hoja.getRange("A2:A" + hoja.getLastRow()).getValues();

     var opcionesPregunta = [];

     for (var i = 0; i < opciones.length; i++) {
          opcionesPregunta.push(opciones[i][0]);
     }

     if (pregunta.getType() === FormApp.ItemType.LIST) {
          pregunta.asListItem().setChoiceValues(opcionesPregunta);
     } else {
          Logger.log('La pregunta no es de tipo desplegable.');
     }
}
function opcionesProduccion() {
     var preguntaId = '879441447';

     var form = FormApp.openById(formId);

     var pregunta = form.getItemById(preguntaId);

     var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CURSOS_PRODUCCION');
     var opciones = hoja.getRange("A2:A" + hoja.getLastRow()).getValues();

     var opcionesPregunta = [];

     for (var i = 0; i < opciones.length; i++) {
          opcionesPregunta.push(opciones[i][0]);
     }

     if (pregunta.getType() === FormApp.ItemType.LIST) {
          pregunta.asListItem().setChoiceValues(opcionesPregunta);
     } else {
          Logger.log('La pregunta no es de tipo desplegable.');
     }
}


function onFormSubmit(e) {
     var sheetName = 'Form.Matricula';
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
     var row = sheet.getLastRow();

     var cursoSistema = sheet.getRange(row, 9).getValue()
     var cursoAgraria = sheet.getRange(row, 10).getValue()
     var datos = cursoSistema + cursoAgraria;
     sheet.getRange(row, 7).setValue(datos.trim())
}

function estadoSol() {
     var hojaRespuestas = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FormCertificado");
     var hojaData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form.Matricula");

     var datosRespuestas = hojaRespuestas.getDataRange().getValues();
     var datosData = hojaData.getDataRange().getValues();

     var columnaDNIData = datosData[0].indexOf("DNI");
     var columnaDNIRespuestas = datosRespuestas[0].indexOf("DNI");
     var columnaNombresData = datosData[0].indexOf("Nombres");
     var columnaNombresRespuestas = datosRespuestas[0].indexOf("Nombres");
     var columnaApellidosData = datosData[0].indexOf("Apellidos");
     var columnaApellidosRespuestas = datosRespuestas[0].indexOf("Apellidos");
     var columnaCarreraData = datosData[0].indexOf("Carrera");
     var columnaCarreraRespuestas = datosRespuestas[0].indexOf("Carrera");

     if (columnaDNIData !== -1 && columnaDNIRespuestas !== -1 && columnaNombresData !== -1 && columnaNombresRespuestas !== -1 && columnaApellidosData !== -1 && columnaApellidosRespuestas !== -1 && columnaCarreraData !== -1 && columnaCarreraRespuestas !== -1) {
          for (var i = 1; i < datosRespuestas.length; i++) {
               var dniRespuesta = datosRespuestas[i][columnaDNIRespuestas].toString();
               var nombresRespuesta = datosRespuestas[i][columnaNombresRespuestas].toString();
               var apellidosRespuesta = datosRespuestas[i][columnaApellidosRespuestas].toString();
               var carreraRespuesta = datosRespuestas[i][columnaCarreraRespuestas].toString();
               var matriculado = false;

               for (var j = 1; j < datosData.length; j++) {
                    var dniData = datosData[j][columnaDNIData].toString();
                    var nombresData = datosData[j][columnaNombresData].toString();
                    var apellidosData = datosData[j][columnaApellidosData].toString();
                    var carreraData = datosData[j][columnaCarreraData].toString();

                    if (dniRespuesta === dniData && nombresRespuesta === nombresData && apellidosRespuesta === apellidosData && carreraRespuesta === carreraData) {
                         matriculado = true;
                         break;
                    }
               }

               hojaRespuestas.getRange(i + 1, 7).setValue(matriculado ? "✅ Matriculado" : "❌ No Matriculado");
          }
     } else {
          console.error("No se encontró alguna de las columnas requeridas en ambas hojas");
     }
}


function certificadoDenegada(fila) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form.Matricula');
     var datosFila = sheet.getRange(fila, 1, 1, sheet.getLastColumn()).getValues()[0];

     var email = datosFila[1];
     var nombre = datosFila[2];
     var apellido = datosFila[3];
     var cursosTrimmed = datosFila[6];

     var asunto = `Certificado Denegado - Curso ${cursosTrimmed}`;
     var cuerpo = generarCuerpoMensajeDenegado(nombre, apellido, cursosTrimmed);

     // Enviar correo electrónico
     GmailApp.sendEmail(email, asunto, cuerpo, {
          name: 'I.E.S VALLE GRANDE',
          htmlBody: cuerpo,
     });
}

function generarCuerpoMensajeDenegado(nombre, apellido, cursosTrimmed) {
     var cuerpo = `<p>Estimado(a) ${nombre} ${apellido},</p>`;
     cuerpo += `<p>Lamentamos informarte que tu solicitud de certificado ha sido denegada para el curso ${cursosTrimmed}</p>`;
     cuerpo += "<p>Por favor, ponte en contacto con nosotros si tienes alguna pregunta o necesitas más información.</p>";
     cuerpo += "<p>Atentamente,</p>";
     cuerpo += "<p>Secretaría Académica: 930 537 783</p>";

     return cuerpo;
}


function actualizarFormCertificado() {
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var matriculaSheet = ss.getSheetByName('Form.Matricula');
     var certificadoSheet = ss.getSheetByName('FormCertificado');

     var matriculaData = matriculaSheet.getRange('B2:G' + matriculaSheet.getLastRow()).getValues();
     var certificadoData = certificadoSheet.getRange('B2:H' + certificadoSheet.getLastRow()).getValues();

     certificadoData.forEach(function (certificadoRow, certificadoIndex) {
          var certificadoValues = certificadoRow.slice(0, 5);
          var valorG = '';

          matriculaData.forEach(function (matriculaRow) {
               var matriculaValues = matriculaRow.slice(0, 5);

               if (JSON.stringify(certificadoValues) === JSON.stringify(matriculaValues)) {
                    valorG = matriculaRow[5];
               }
          });
          certificadoSheet.getRange('H' + (certificadoIndex + 2)).setValue(valorG);
     });
}

function copiarDatos() {
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var formCertificado = ss.getSheetByName("FormCertificado");

     var cursosSistemas = ss.getSheetByName("CURSOS_SISTEMAS");
     var cursosSistemasData = cursosSistemas.getDataRange().getValues();
     copiarDatosPorCriterio(formCertificado, cursosSistemasData, "ANÁLISIS DE SISTEMAS", 5);

     var cursosProduccion = ss.getSheetByName("CURSOS_PRODUCCION");
     var cursosProduccionData = cursosProduccion.getDataRange().getValues();
     copiarDatosPorCriterio(formCertificado, cursosProduccionData, "PRODUCCIÓN AGRARIA", 5);
}

function copiarDatosPorCriterio(formCertificado, cursosData, criterio, columnaCriterio) {
     var formCertificadoData = formCertificado.getDataRange().getValues();

     for (var i = 0; i < formCertificadoData.length; i++) {
          var valorF = formCertificadoData[i][columnaCriterio];
          if (valorF == criterio) {
               var valorH = formCertificadoData[i][7];
               for (var j = 0; j < cursosData.length; j++) {
                    if (valorH == cursosData[j][0]) {
                         var datosCopia = cursosData[j].slice(1);
                         formCertificado.getRange(i + 1, 9, 1, datosCopia.length).setValues([datosCopia]);
                         break;
                    }
               }
          }
     }
}


