// importations des modules d'electron
const { app, BrowserWindow } = require('electron');
// importation du package "path" pour recréer les chemins
const path = require('path');

// fonction de création de la fenêtre
function createWindow () {
  // nouvel objet fenêtre
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // },
    backgroundColor: "#36393F",
    icon: path.join(__dirname, 'W.A.C.ico')
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
