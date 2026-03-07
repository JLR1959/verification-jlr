const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-setuid-sandbox');

const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const https = require('https');

const SERVER_URL = "https://licence-server-jlr.onrender.com/activate";
const RENEW_URL = "https://ton-site-renouvellement.com"; // ← remplace par ton site

const licencePath = path.join(app.getPath('appData'), 'VPIJLR', 'licence.json');

const DEMO_FILE = path.join(app.getPath('appData'), 'VPIJLR', 'demo.json');
const DEMO_DAYS = 7;

function getMachineId() {
  return crypto.createHash('sha256')
    .update(os.hostname() + os.arch() + os.platform())
    .digest('hex');
}

function licenceExists() {
  return fs.existsSync(licencePath);
}

function readLicence() {
  return JSON.parse(fs.readFileSync(licencePath));
}

function saveLicence(data) {
  const dir = path.dirname(licencePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(licencePath, JSON.stringify(data, null, 2));
}

function daysRemaining(expiry) {
  const today = new Date();
  const exp = new Date(expiry);
  const diff = exp - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function checkExpiry() {

  const licence = readLicence();

  if (licence.type !== "subscription") return true;

  const remaining = daysRemaining(licence.expiry);

  if (remaining <= 0) {

    dialog.showMessageBoxSync({
      type: 'error',
      title: 'Licence expirée',
      message: 'Votre abonnement est expiré.',
      buttons: ['Renouveler', 'Quitter']
    }) === 0
      ? shell.openExternal(RENEW_URL)
      : app.quit();

    app.quit();
    return false;
  }

  if (remaining <= 3) {
    dialog.showMessageBox({
      type: 'warning',
      title: 'Licence expire bientôt',
      message: `Votre abonnement expire dans ${remaining} jour(s).`,
      buttons: ['OK', 'Renouveler']
    }).then(result => {
      if (result.response === 1) {
        shell.openExternal(RENEW_URL);
      }
    });
  }

  if (remaining <= 7 && remaining > 3) {
    dialog.showMessageBox({
      type: 'info',
      title: 'Rappel abonnement',
      message: `Votre abonnement expire dans ${remaining} jours.`,
      buttons: ['OK']
    });
  }

  return true;
}

function saveDemoStart(date) {

  const dir = path.dirname(DEMO_FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(DEMO_FILE, JSON.stringify({ start: date }, null, 2));
}

function loadDemoStart() {

  if (!fs.existsSync(DEMO_FILE)) return null;

  const raw = fs.readFileSync(DEMO_FILE);

  const data = JSON.parse(raw);

  return data.start;
}

function checkDemo() {

  let start = loadDemoStart();

  if (!start) {

    start = Date.now();

    saveDemoStart(start);

    return true;
  }

  const now = Date.now();

  const diff = now - start;

  const days = diff / (1000 * 60 * 60 * 24);

  const remaining = Math.ceil(DEMO_DAYS - days);

  if (days >= DEMO_DAYS) {

    dialog.showMessageBoxSync({
      type: 'error',
      title: 'Version démo expirée',
      message: 'La période d’essai de 7 jours est expirée.',
      buttons: ['Activer licence', 'Quitter']
    }) === 0
      ? createActivationWindow()
      : app.quit();

    return false;
  }

  dialog.showMessageBox({
    type: 'info',
    title: 'Version démonstration',
    message: `Version démo active.\nIl reste ${remaining} jour(s) d’essai.`,
    buttons: ['OK']
  });

  return true;
}

function createMainWindow() {

  if (!checkExpiry()) return;

  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

function createActivationWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 250,
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  win.loadFile('activation.html');
}

function activateLicence(licenceKey, callback) {

  const data = JSON.stringify({
    licenceKey,
    machineId: getMachineId()
  });

  const url = new URL(SERVER_URL);

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, res => {
    let body = "";
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(body);
        callback(response);
      } catch {
        callback({ valid: false });
      }
    });
  });

  req.on('error', () => callback({ valid: false }));

  req.write(data);
  req.end();
}

app.whenReady().then(() => {

  if (licenceExists()) {

    createMainWindow();

  } else {

    if (checkDemo()) {

      createMainWindow();

    } else {

      createActivationWindow();

    }

  }

});

ipcMain.on('activate-key', (event, licenceKey) => {

  activateLicence(licenceKey, (response) => {

    if (response.valid) {

      saveLicence({
        licenceKey,
        machineId: getMachineId(),
        type: response.type,
        plan: response.plan,
        expiry: response.expiry
      });

      BrowserWindow.getAllWindows().forEach(win => win.close());
      createMainWindow();

    } else {
      event.reply('activation-failed');
    }

  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
