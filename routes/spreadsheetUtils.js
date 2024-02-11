const { google } = require('googleapis');

const getUsersSpreadsheetData = async (range) => {
     const auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
     });

     const getClient = async () => {
          const client = await auth.getClient();
          return client;
     };

     const client = await getClient();
     const sheets = google.sheets({ version: "v4", auth: client });

     try {
          const response = await sheets.spreadsheets.values.get({
               spreadsheetId: "1a1pBDJBP50Epp9nIEP64CDMydJ1h0EiJ0pvVlvfBOCY",
               range,
          });

          return response.data.values;
     } catch (error) {
          console.error("Error al obtener datos de Usuarios:", error);
          throw error;
     }
};

const updateUsersSpreadsheetData = async (data, range) => {
     const auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
     });

     const getClient = async () => {
          const client = await auth.getClient();
          return client;
     };

     const client = await getClient();
     const sheets = google.sheets({ version: 'v4', auth: client });

     try {
          const updateResponse = await sheets.spreadsheets.values.update({
               spreadsheetId: '1a1pBDJBP50Epp9nIEP64CDMydJ1h0EiJ0pvVlvfBOCY',
               range,
               valueInputOption: 'RAW',
               resource: {
                    values: data,
               },
          });

          console.log('Datos actualizados en la hoja de cálculo de Usuarios:', updateResponse.data);
     } catch (error) {
          console.error('Error al actualizar datos en la hoja de cálculo de Usuarios:', error);
          throw error;
     }
};

const getDriveFileInfo = async (fileId) => {
     const auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: ["https://www.googleapis.com/auth/drive"],
     });

     const getClient = async () => {
          const client = await auth.getClient();
          return client;
     };

     const client = await getClient();
     const drive = google.drive({ version: 'v3', auth: client });

     try {
          const fileInfo = await drive.files.get({
               fileId,
          });

          console.log('Información del archivo en Google Drive:', fileInfo.data);
          return fileInfo.data;
     } catch (error) {
          console.error('Error al obtener información del archivo en Google Drive:', error);
          throw error;
     }
};
const updateMatriculaStatus = async (index, estado) => {
     const auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
     });

     const getClient = async () => {
          const client = await auth.getClient();
          return client;
     };

     const client = await getClient();
     const sheets = google.sheets({ version: 'v4', auth: client });

     try {
          // Actualiza la hoja de cálculo FormCertificado con el nuevo estado
          const spreadsheetId = '1a1pBDJBP50Epp9nIEP64CDMydJ1h0EiJ0pvVlvfBOCY'; // ID del documento de Google Sheets
          const range = `'FormCertificado'!T${index + 2}:T${index + 2}`; // Columna V en la hoja FormCertificado, la primera fila es la cabecera, por eso se suma 2
          const valueInputOption = 'RAW';
          const resource = {
               values: [[estado]]
          };

          const response = await sheets.spreadsheets.values.update({
               spreadsheetId,
               range,
               valueInputOption,
               resource
          });

          console.log(`Estado de matrícula actualizado en la fila ${index} de FormCertificado a ${estado}`);
     } catch (error) {
          console.error('Error al actualizar el estado de matrícula:', error);
          throw error;
     }
};

module.exports = {
     updateMatriculaStatus
};


module.exports = {
     getUsersSpreadsheetData,
     updateUsersSpreadsheetData,
     getDriveFileInfo,
     updateMatriculaStatus
};
