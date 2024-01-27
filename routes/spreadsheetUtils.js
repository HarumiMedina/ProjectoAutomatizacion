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
               spreadsheetId: "1Z8H8lTRmMemU_ZyZVyFKfsXN6BTV3WjrPyx4YNK-Ed8",
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
               spreadsheetId: '1Z8H8lTRmMemU_ZyZVyFKfsXN6BTV3WjrPyx4YNK-Ed8',
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

module.exports = {
     getUsersSpreadsheetData,
     updateUsersSpreadsheetData,
     getDriveFileInfo,
};
