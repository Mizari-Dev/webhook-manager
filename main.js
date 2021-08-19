// importations des modules d'electron
const { app, BrowserWindow } = require('electron');
// importation du package "path" pour recréer les chemins
const path = require('path');
// importation du package "fs" pour lire le fichier json
const fs = require('fs');

// function checkWebhook() {
//   var res = false;
//
//   fs.readFile('webhooks-stack.json', async (err, data) => {
//     if (err) res = "error";
//
//     let json = await JSON.parse(data);
//     if (json.length > 0) {
//       res = true;
//     }
//   });
//
//   return res;
// }
//
// console.log(checkWebhook());

// fonction de création de la fenêtre
function createWindow () {
  // nouvel objet fenêtre
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/W.A.C.ico')
  });

  // on affiche le contenu de l'index.html
  win.loadFile('index.html');
  // supprime la barre de menu au top
  win.menuBarVisible = false;
  // met la fenêtre en grand écran
  win.maximize();
}

// quand l'app est prête
app.whenReady().then(() => {
  // on créer la fenêtre
  createWindow();

  // si y a aucune fenêtre ouverte, on en créer une
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

// gestion fermeture de l'app sur Mac
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
